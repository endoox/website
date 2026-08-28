import AppKit
import PDFKit

guard CommandLine.arguments.count == 3 else {
    fatalError("Usage: render_pdf.swift input.pdf output-directory")
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)
try FileManager.default.createDirectory(at: outputURL, withIntermediateDirectories: true)

guard let document = PDFDocument(url: inputURL) else {
    fatalError("Could not open PDF")
}

for index in 0..<document.pageCount {
    guard let page = document.page(at: index) else { continue }
    let bounds = page.bounds(for: .mediaBox)
    let scale: CGFloat = 2.0
    let pixelWidth = Int(bounds.width * scale)
    let pixelHeight = Int(bounds.height * scale)

    guard let bitmap = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: pixelWidth,
        pixelsHigh: pixelHeight,
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bytesPerRow: 0,
        bitsPerPixel: 0
    ) else { continue }

    bitmap.size = NSSize(width: bounds.width, height: bounds.height)
    NSGraphicsContext.saveGraphicsState()
    guard let graphicsContext = NSGraphicsContext(bitmapImageRep: bitmap) else { continue }
    NSGraphicsContext.current = graphicsContext
    NSColor.white.setFill()
    NSRect(origin: .zero, size: bounds.size).fill()
    let context = graphicsContext.cgContext
    context.saveGState()
    page.draw(with: .mediaBox, to: context)
    context.restoreGState()
    graphicsContext.flushGraphics()
    NSGraphicsContext.restoreGraphicsState()

    guard let png = bitmap.representation(using: .png, properties: [:]) else { continue }
    let destination = outputURL.appendingPathComponent("native-page-\(index + 1).png")
    try png.write(to: destination)
}

print("Rendered \(document.pageCount) pages")
