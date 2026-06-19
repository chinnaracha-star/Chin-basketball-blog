import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

const contacts = [
  {
    href: "mailto:hello@hhblog.com",
    label: "hello@hhblog.com",
    Icon: Mail,
  },
  {
    href: "tel:+66000000000",
    label: "+66 00 000 0000",
    Icon: Phone,
  },
  {
    href: "https://instagram.com",
    label: "Instagram message",
    Icon: MessageCircle,
  },
  {
    href: "https://facebook.com",
    label: "Direct message",
    Icon: Send,
  },
  {
    href: "https://maps.google.com",
    label: "Bangkok, Thailand",
    Icon: MapPin,
  },
];

export function Footer() {
  return (
    <footer className="px-5 pb-8 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-lg border border-[#ddd7cd] bg-[#fdfcf9] px-6 py-8 shadow-sm sm:px-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#9a9187]">
            Get In Touch
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#302c29]">
            Let's talk basketball
          </h2>
        </div>

        <ul className="flex flex-wrap gap-3">
          {contacts.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8d2c9] bg-white text-[#302c29] transition hover:bg-[#f3f0ea]"
                aria-label={label}
              >
                <Icon size={18} strokeWidth={1.8} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
