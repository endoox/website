// Newest first; the first story is the featured one at the top of /customer-stories.
// Drop the cover (1200×675) in public/customer-stories/ and add an entry. The page lives at
// /customer-stories/<slug>, and /customer-stories and its footer link only appear once this has entries.
// Headshots (200×200) go in public/customer-stories/people/; people without one show just their name. Paragraphs can link with [label](https://…).

export type StoryPerson = { name: string; title?: string; org: string; image?: string };

export type StoryBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; by?: string };

export type CustomerStory = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readMinutes: number;
  cover: string;
  // The agency's own site, linked from the story's sidebar.
  website?: string;
  people: StoryPerson[];
  products: string[];
  body: StoryBlock[];
};

export const CUSTOMER_STORIES: CustomerStory[] = [
  {
    slug: "quartexx-hockey",
    title: "How Quartexx Hockey Saves 10-15 Hours a Week with endo",
    summary: "One of hockey's five largest agencies runs its talent marketing business on endo, from the first brand conversation to the final payment.",
    date: "2026-10-26",
    readMinutes: 4,
    cover: "/customer-stories/quartexx-hockey.png",
    website: "https://www.quartexxmanagement.com",
    people: [
      { name: "Shelbi Kilcollins", title: "Director of Marketing", org: "Quartexx Hockey", image: "/testimonials/shelbi-kilcollins.png" },
      { name: "Charlie Di Bratto", title: "Marketing Coordinator", org: "Quartexx Hockey", image: "/customer-stories/people/charlie-di-bratto.png" },
    ],
    products: ["Contract management", "Deliverables & Social Analytics", "Financial tracking", "Media kits", "endodeals valuation"],
    body: [
      { type: "p", text: "Few agencies in hockey carry a roster like Quartexx Hockey's. Founded in Montreal in 2015, Quartexx set out to build a family-oriented agency that goes well beyond contract negotiation. A decade later it ranks among the five largest agencies in the sport, with more than 100 clients and over $1 billion in contract value under management." },
      { type: "p", text: "That roster runs deep. Quartexx has represented stars like Mitch Marner, Kris Letang, Taylor Hall and Patrice Bergeron." },
      { type: "p", text: "Today its client list includes NHL standouts like Lane Hutson, Will Smith, and Sam Bennett. Its client list extends to professional women's hockey, where Quartexx represents players across the PWHL." },
      { type: "h2", text: "A Marketing Team That Runs Like a Front Office" },
      { type: "p", text: "Quartexx made marketing a priority, bringing in incredible people like Shelbi Kilcollins, who is making their players into household names along with bringing in tons of marketing revenue." },
      { type: "p", text: "Shelbi sums up the job simply:" },
      { type: "quote", text: "The ethos of a good agent is ensuring that your client, one, makes a ton of money, and two, is paid on time in an effective way.", by: "Shelbi Kilcollins" },
      { type: "p", text: "With this marketing growth comes a lot. A single month can bring a dozen production shoots, new equipment deals, memorabilia signings and brand activations, each with its own deliverables, deadlines and payments. endo has been here to help." },
      { type: "quote", text: "endo has anchored Quartexx's marketing efforts and has been key to our team's strategic growth. It's helped us streamline the high volume of administrative work that comes with endorsement deals, made our sales outreach more efficient and left us better prepared for negotiations.", by: "Shelbi Kilcollins" },
      { type: "p", text: "What that looks like on a real night:" },
      { type: "quote", text: "People don't know that [a client's dad] is calling me at 11:30 on a Sunday night asking the status of [his trading cards], and I'm sitting in a hotel lobby. What used to be, I have to call Charlie and walk through this Google Sheet, now it's like 30 seconds.", by: "Shelbi Kilcollins" },
      { type: "h2", text: "Built Around Quartexx From Day One" },
      { type: "p", text: "Quartexx was one of endo's earliest partners, and much of the platform was shaped by its feedback. Charlie Di Bratto, who manages a lot of the day to day, is one of endo's biggest users." },
      { type: "p", text: "Complex equipment and trading card deals can carry a dozen installments and as many bonuses. endo's contract parser turns those agreements into payment schedules and deliverables in seconds." },
      { type: "p", text: "Social analytics and media kits save just as much time. Pulling together a player's numbers for a brand now takes minutes, not an afternoon." },
      { type: "quote", text: "I turned around a deck to [a brand] in six minutes yesterday on my way out after a great call.", by: "Shelbi Kilcollins" },
      { type: "h2", text: "Looking Ahead" },
      { type: "p", text: "For Quartexx Hockey, endo is the foundation its talent marketing business is building on, from the first brand conversation to the final payment." },
      { type: "quote", text: "When we look back on our marketing wins in a few years, endo will be a big part of the 'why.'", by: "Shelbi Kilcollins" },
    ],
  },
  {
    slug: "rsg-hockey",
    title: "How RSG Hockey Walks Into Every Brand Conversation With Data",
    summary: "RSG Hockey backs every endorsement ask with fair market value data from endodeals, and keeps its books current in seconds.",
    date: "2026-10-26",
    readMinutes: 4,
    cover: "/customer-stories/rsg-hockey.png",
    website: "https://rsghockey.com",
    people: [
      { name: "Tyler Wagner", title: "Director of Marketing", org: "RSG Hockey", image: "/testimonials/tyler-wagner.png" },
    ],
    products: ["endodeals valuation", "Financial tracking", "Contract management", "Media kits"],
    body: [
      { type: "p", text: "Few hockey agencies are built the way RSG Hockey is. President and CEO Allain Roy won an NCAA title in goal at Harvard, played for Canada's 1994 Olympic silver medal team and had a stint in the NHL before moving into representation. In 2015 he rebranded his agency as Roy Sports Group, better known today as RSG Hockey." },
      { type: "p", text: "From its home base in St. Louis, RSG has grown into one of the ten largest agencies in the sport, with more than 80 clients and over $600 million in contract value. Its roster includes names like Nico Hischier, Brandon Hagel, Brent Burns and Philipp Grubauer." },
      { type: "p", text: "That success comes from treating players as more than contracts. RSG supports clients across signing, legal, marketing and lifestyle management, and its marketing team works to turn on-ice careers into lasting brand partnerships." },
      { type: "h2", text: "Marketing Built on Data, Not Assumptions" },
      { type: "p", text: "For Tyler Wagner, Director of Marketing, the biggest change has been pricing. With endodeals valuation, RSG now backs every ask with fair market value data." },
      { type: "quote", text: "Instead of going into brand conversations with assumptions, we now have credible data to support our pricing. It gives us real leverage.", by: "Tyler Wagner" },
      { type: "h2", text: "A Partner That Moves at Their Speed" },
      { type: "p", text: "RSG has met with the endo team regularly since June, and its feedback has shaped features now used across the platform, like by-request deliverables. When Tyler asked for a different way to view his brand pipeline, it was already there." },
      { type: "quote", text: "You already did it. That's how fast you guys are.", by: "Tyler Wagner" },
      { type: "h2", text: "Looking Ahead" },
      { type: "p", text: "For RSG Hockey, endo is the system behind a growing marketing business, from the first valuation to the final payment." },
    ],
  },
  {
    slug: "orr-hockey-group",
    title: "How ORR Hockey Group Keeps a Coast-to-Coast Team on the Same Page",
    summary: "With agents spread across North America, ORR Hockey Group runs its roster, contracts, schedules and deals from one shared home in endo.",
    date: "2026-10-26",
    readMinutes: 4,
    cover: "/customer-stories/orr-hockey-group.png",
    website: "https://www.orr.hockey",
    people: [
      { name: "Michael Curran", org: "ORR Hockey Group" },
      { name: "Dan Marshall", org: "ORR Hockey Group" },
    ],
    products: ["Roster visibility", "Talent scheduling", "Contract management", "Media kits", "Financial tracking"],
    body: [
      { type: "p", text: "Few names in hockey carry more weight than ORR. The Orr Hockey Group was formed in 2002 by Bobby Orr and partners including Rick Curran as a player-first agency, and it has represented some of the biggest names in the sport. Today ORR's clients include Boston Bruins defenseman Charlie McAvoy, legend Jeff Carter, the Staal Brothers, and Ryan Whitney along with a deep pipeline of junior, college and pro prospects and players." },
      { type: "p", text: "What keeps ORR at the top is how personal the work stays. Agents are at the rink constantly, scouting junior tournaments, checking in on clients and building the relationships that carry a career from draft day to free agency." },
      { type: "p", text: "That also means the team is rarely in one place. Agents work out of New Jersey, Massachusetts and Western Canada, covering games across North America every week." },
      { type: "quote", text: "For me, it's efficiency. We all don't go to a central office. There is no water cooler to sit around and talk. So efficiency is everything.", by: "Michael Curran" },
      { type: "h2", text: "One Place for the Whole Agency" },
      { type: "p", text: "With endo, ORR's roster, contracts, schedules and deals live in one shared platform. Every agent sees the same information, so nobody has to call around to find out what was signed or who is going where." },
      { type: "h2", text: "Scheduling Built for Hockey" },
      { type: "p", text: "With clients spread across junior, college and pro leagues, simply knowing who is playing where takes real work. endo pulls every client's schedule into one calendar." },
      { type: "quote", text: "The player schedule is amazing. That thing saves a lot of time with juniors and pros and figuring out who's going where.", by: "Michael Curran" },
      { type: "h2", text: "Making Every Off-Ice Hour Count" },
      { type: "p", text: "A hockey season leaves players only a handful of open days for brand work. Dan Marshall sees those windows as the most valuable part of the calendar, and with every client's schedule in endo, the team can see them coming." },
      { type: "quote", text: "Their time is valuable. How do we maximize those blackout dates? Because that's where the money is.", by: "Dan Marshall" },
      { type: "p", text: "ORR has been a hands-on design partner since day one, and that feedback shows in the product." },
      { type: "quote", text: "It's come light years. Some of these things that we're talking about that are our frustrations, you're kind of smoothing them out.", by: "Dan Marshall" },
      { type: "h2", text: "Looking Ahead" },
      { type: "p", text: "For ORR Hockey Group, endo is the shared home that lets a distributed team work like it's in the same room." },
    ],
  },
  {
    slug: "tonbara",
    title: "How Tonbara Sports & Entertainment Manages a Roster That Spans Every Sport",
    summary: "From an Olympic legend to an F1 Academy driver, Tonbara prices every deal on one standard of value and runs its multi-sport agency from one HQ in endo.",
    date: "2026-10-26",
    readMinutes: 4,
    cover: "/customer-stories/tonbara.png",
    website: "https://www.tonbaramg.com",
    people: [
      { name: "Patrik Darabont", title: "Founder & Principal", org: "Tonbara Sports & Entertainment", image: "/testimonials/patrik-darabont.png" },
      { name: "Deion Adams", org: "Tonbara Sports & Entertainment", image: "/customer-stories/people/deion-adams.png" },
    ],
    products: ["endodeals valuation", "Roster visibility", "Talent portal", "Media kits", "Financial tracking"],
    body: [
      { type: "p", text: "Few agencies can say they represent an Olympic legend, an F1 Academy driver and a PWHL world champion. Tonbara can. With offices in Toronto, Miami and New York, and licenses across FIFA, FIBA, the PWHL and the NBPA, Tonbara Sports & Entertainment has built one of the most diverse rosters in athlete representation." },
      { type: "p", text: "Its [roster](https://www.tonbaramg.com/athletes) runs from icons to rising stars which includes Donovan Bailey, Kristin O'Neill, Nick Anderson and so many more." },
      { type: "p", text: "What ties it together is Tonbara's approach. The agency manages the full journey, from NIL strategy and pro contracts to brand partnerships, mentorship and long-term legacy." },
      { type: "h2", text: "One Standard of Value Across Every Sport" },
      { type: "p", text: "A sprinter, a rower and a hockey player have nothing in common on a rate card. endodeals valuation gives every athlete on the roster a fair market value built on the same data, so Tonbara can price any deal with confidence." },
      { type: "quote", text: "Representing athletes across a dozen sports means no two deals look alike. endo gives us one consistent, data-backed read on value across all of them.", by: "Patrik Darabont" },
      { type: "h2", text: "One HQ for a Multi-Sport Agency" },
      { type: "p", text: "With agents leading different divisions, and some talent co-represented, Patrik needs a clear view of everything without being in every conversation. endo replaces the spreadsheets that used to hold it all together." },
      { type: "quote", text: "We've moved off of some of the other things we were using, Google Sheets and things like that. I can just input everything here. It's like our HQ.", by: "Patrik Darabont" },
      { type: "h2", text: "Athletes in the Loop" },
      { type: "p", text: "Tonbara's clients can now log into their own profile to see their deals, pipeline and payments. When an athlete asks what's happening with their marketing, the answer is already in front of them." },
      { type: "quote", text: "That's been our biggest struggle. Now they actually have the visibility into it.", by: "Patrik Darabont" },
      { type: "h2", text: "Built With Their Feedback" },
      { type: "p", text: "Tonbara meets with the endo team regularly, and its requests shape what ships next." },
      { type: "quote", text: "It's cool to have something that you guys take our feedback and then put it in. It's really awesome.", by: "Deion Adams" },
      { type: "h2", text: "Looking Ahead" },
      { type: "p", text: "As Tonbara keeps adding talent across sports and markets, endo is the system that scales with it." },
      { type: "quote", text: "Having something more detailed than what we get from a high level is super beneficial for us as we grow. You guys help us get there, which is why we work with you guys.", by: "Patrik Darabont" },
    ],
  },
  {
    slug: "khg-sports-management",
    title: "How KHG Sports Management Keeps Its Big Leaguers Paid and Its Pipeline Full",
    summary: "Baseball agency KHG Sports Management uses endo to get every player paid on time, catch renewals early and keep a nationwide team on one page.",
    date: "2026-10-26",
    readMinutes: 5,
    cover: "/customer-stories/khg-sports-management.png",
    website: "https://www.khgsports.com",
    people: [
      { name: "Drew Hardee", title: "Co-Founder & Vice President", org: "KHG Sports Management", image: "/testimonials/drew-hardee.png" },
      { name: "Josh Knipp", title: "Co-Founder", org: "KHG Sports Management", image: "/customer-stories/people/josh-knipp.png" },
      { name: "Justin Hancock", org: "KHG Sports Management", image: "/customer-stories/people/justin-hancock.png" },
    ],
    products: ["Financial tracking", "Contract management", "Roster visibility", "Talent portal", "CRM and pipeline"],
    body: [
      { type: "p", text: "KHG Sports Management was built for one sport and built to win in it. Drew Hardee and Josh Knipp founded the agency in 2017 to give baseball players a full-service home, from contract and arbitration work to endorsements and marketing. Their philosophy is simple: athletes should only have to focus on playing their sport." },
      { type: "p", text: "Nine years later, KHG's roster is loaded with absolute studs. It's headlined by San Diego Padres star Jackson Merrill, a 2024 All-Star who signed a nine-year, nine-figure extension in 2025. Behind him is a group of big leaguers and one of the deepest prospect pipelines in the game." },
      { type: "p", text: "That group includes Cubs reliever Jacob Webb, Padres pitcher Alek Jacob and Astros catcher César Salazar." },
      { type: "p", text: "The roster doesn't stop at the majors. KHG represents minor leaguers on their way up, top undrafted prospects and college and high school players years away from the draft. Every one of them gets the same level of care." },
      { type: "p", text: "KHG's agents are spread across the country, each covering a territory of their own." },
      { type: "h2", text: "Getting Every Player Paid" },
      { type: "p", text: "When the season ends, the invoices start. Endorsement and equipment deals pay out on their own schedules, and with a roster this deep, keeping track of what is due to whom used to mean a lot of manual digging. Now endo flags every payment that is due, right on the roster." },
      { type: "quote", text: "The last couple days I've been going through y'all's platform, sending out invoices to these companies to get these guys paid now that the season's over. I will say this thing's been super helpful. Props to you guys for sending notifications that, hey, this is due.", by: "Drew Hardee" },
      { type: "h2", text: "Never Letting a Deal Lapse" },
      { type: "p", text: "The best renewal is the one you start early. endo surfaces contracts that are coming to a close, so the team can get back to brands before a partnership quietly expires." },
      { type: "quote", text: "It basically says this needs to be extended, it's coming to a close. So now I've been able to say, actually, I need to talk to these companies and see if they want to extend it. Having those little reminders has been good.", by: "Drew Hardee" },
      { type: "h2", text: "Recruiting Without Crossed Wires" },
      { type: "p", text: "Offseason means recruiting season, from high school and college players to minor leaguers. With agents in different regions working their own target lists, KHG needs every agent to know who is already in conversation with whom. They're helping shape endo's next recruiting tools to do exactly that." },
      { type: "quote", text: "If [our other agents] recruited a guy and he's still talking to him, and I reach out to the same kid, we look like idiots. We want to be able to know exactly who we're talking to.", by: "Drew Hardee" },
      { type: "h2", text: "Looking Ahead" },
      { type: "quote", text: "endo and the team there have helped create a hub for our agency, enhancing our processes to provide the highest level of service to our clients.", by: "Drew Hardee" },
    ],
  },
  {
    slug: "peak-athletes",
    title: "How Peak Athletes Built a Platform Around the Way It Actually Works",
    summary: "One of endo's earliest design partners, Peak Athletes uses endo to back every ask with data, protect its athletes' brands and spend less time on admin.",
    date: "2026-10-26",
    readMinutes: 4,
    cover: "/customer-stories/peak-athletes.png",
    website: "https://www.peakathletes.co",
    people: [
      { name: "Nic Métayer", title: "Founder", org: "Peak Athletes", image: "/testimonials/nic-metayer.png" },
    ],
    products: ["endodeals valuation", "Contract management", "Deliverables & Social Analytics", "Financial tracking", "CRM and pipeline"],
    body: [
      { type: "p", text: "Peak Athletes does it all for its clients. Founded by Nic Métayer, the agency represents Olympians and professional hockey players, handling everything from brand partnerships and social media to playing contracts. With a lean team split between Toronto and Montreal, every athlete gets a hands-on, personal approach." },
      { type: "quote", text: "I do it all for them.", by: "Nic Métayer" },
      { type: "p", text: "That model takes real work. Olympic athletes live on four-year cycles, and between Games, Nic has to rebuild their story for brands and find partners who care about the athlete, not just the moment. For pro hockey players, the work runs year round." },
      { type: "h2", text: "Built With Peak, Not Just For It" },
      { type: "p", text: "Peak was one of endo's earliest design partners. Rather than adopting an off-the-shelf system, Nic worked directly with the endo team to shape a platform around how a modern agency actually operates." },
      { type: "quote", text: "This wasn't off-the-shelf. It was built with us, around the way a modern sports agency actually works.", by: "Nic Métayer" },
      { type: "h2", text: "Every Dollar Counts at the Table" },
      { type: "p", text: "Nic brings years of dealmaking experience to every negotiation. endodeals valuation gives him one more data point to back up his ask, and in a business where margins are tight, that adds up." },
      { type: "h2", text: "Protecting the Athlete's Brand" },
      { type: "p", text: "Many of Peak's partnerships are with brands working with an athlete for the first time. Those deals need close oversight, from contract terms to every piece of content that goes out." },
      { type: "quote", text: "You have to keep a pretty tight leash of approval with those deals, because they've never done it before.", by: "Nic Métayer" },
      { type: "p", text: "With deliverables, deadlines and approvals tracked in endo, the team knows exactly what is owed and when." },
      { type: "h2", text: "Looking Ahead" },
      { type: "p", text: "As Peak's roster grows, endo is the platform the agency helped build, and the one it's building on." },
    ],
  },
  {
    slug: "cook-stark-management",
    title: "How Cook Stark Management Is Building the Business of Women's Hockey",
    summary: "One of the biggest agencies in women's hockey uses endo to see its whole fast-growing business in one place and open doors with brands through media kits.",
    date: "2026-10-26",
    readMinutes: 4,
    cover: "/customer-stories/cook-stark-management-cover.png",
    website: "https://www.cookstarkmgmt.com",
    people: [
      { name: "Lander Cook", title: "Co-Founder & CEO", org: "Cook Stark Management", image: "/testimonials/lander-cook.png" },
      { name: "Dave Stark", title: "Co-Founder", org: "Cook Stark Management", image: "/customer-stories/people/dave-stark.png" },
      { name: "Eleni Demestihas", title: "Director of Hockey Operations", org: "Cook Stark Management", image: "/customer-stories/people/eleni-demestihas.png" },
    ],
    products: ["Media kits", "Roster visibility", "Deliverables & Social Analytics", "Contract management", "Financial tracking"],
    body: [
      { type: "p", text: "Cook Stark Management was built for a moment that was coming. Founders Lander Cook and Dave Stark set out to create an elite agency for female athletes, betting early on the growth of women's sports. When people doubted it, Dave had a simple answer: \"See you in five years.\"" },
      { type: "p", text: "That bet is paying off. With the rise of the PWHL, Cook Stark has become one of the six biggest agencies in women's hockey, representing more than 70 athletes at every level, from the NCAA to the PWHL and top leagues across Europe. It's one of the few agencies in the sport that specializes entirely in the women's game." },
      { type: "p", text: "The team is spread across North America, with Dave in Vancouver and Director of Hockey Operations Eleni Demestihas leading contract work and conversations with general managers." },
      { type: "h2", text: "One Full Picture for a Fast-Growing Agency" },
      { type: "p", text: "Growth brought complexity. Schedules, deal values, contracts and deliverables lived in different places, and every update meant checking several of them. endo brought it all into one platform the whole team can use." },
      { type: "quote", text: "endo has significantly streamlined our fast-growing business and made it easier to see the full picture without having to check multiple different places to reconcile schedules, values, or other information.", by: "Lander Cook" },
      { type: "quote", text: "The user interface is accessible and simple and it provides us with ways to track timelines and deliverables across our team of agents.", by: "Lander Cook" },
      { type: "h2", text: "Media Kits That Open Doors" },
      { type: "p", text: "For a women's hockey agency, telling an athlete's story well is everything. Cook Stark uses endo's media kits to show brands exactly who an athlete is, from audience data to past partnerships." },
      { type: "p", text: "When one longtime product partner had room to grow, Eleni led with a media kit, and the brand came back fast." },
      { type: "quote", text: "What I did first was just send them a media kit. She's occupying a niche that nobody else is occupying, and she has a pre-existing relationship with you. They were super responsive immediately to the media kit.", by: "Eleni Demestihas" },
      { type: "h2", text: "Looking Ahead" },
      { type: "p", text: "With performance contracts, recruiting tools and soccer on the horizon, Cook Stark is growing fast. endo is the system that grows with it." },
    ],
  },
];

// The other stories that share the most endo features with this one; ties keep list order.
export function relatedStories(story: CustomerStory, count = 3) {
  const shared = (other: CustomerStory) => other.products.filter((product) => story.products.includes(product)).length;
  return CUSTOMER_STORIES.filter((other) => other.slug !== story.slug)
    .map((other, i) => ({ other, score: shared(other), i }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, count)
    .map(({ other }) => other);
}

export const formatStoryDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
