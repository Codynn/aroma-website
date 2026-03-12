import Image from 'next/image'
import Link from 'next/link'
import { FOOTER_CONTENT } from '@/constants/layout/footer.constants'
import type { FooterContent, FooterContact } from '@/types/layout/footer.types'

// ── Contact item ──────────────────────────────────────────────────────────────
function ContactItem({ item }: { item: FooterContact }) {
  const inner = (
    <div className="flex items-center gap-3">
      <div className="shrink-0 w-7 h-7 rounded-full bg-[#4a7c3f]
                      flex items-center justify-center">
        <Image
          src={`/icons/${item.icon}.svg`}
          alt=""
          aria-hidden="true"
          width={14}
          height={14}
          className="w-3.5 h-3.5 object-contain brightness-0 invert"
        />
      </div>
      <span className="font-sora text-white
                       text-[14px] lg:text-[15px] leading-snug">
        {item.text}
      </span>
    </div>
  )
  return item.href
    ? <Link href={item.href} className="hover:opacity-80 transition-opacity">{inner}</Link>
    : <div>{inner}</div>
}

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer({ content = FOOTER_CONTENT }: { content?: FooterContent }) {
  return (
    <footer className="relative w-full overflow-hidden min-h-[360px]">

      {/* Background image — full bleed */}
      <Image
        src={content.bgImage}
        alt=""
        aria-hidden="true"
        fill
        className="object-cover object-center"
        quality={90}
      />

      {/* Subtle dark overlay to darken the bg slightly */}
      <div className="absolute inset-0 bg-black/30" />

      {/* ════════════════════════════════════════════════════════
          DESKTOP (lg+)
          Left: Logo + description directly over image (no panel)
          Right: Single frosted glass panel with 3 inner cols
      ════════════════════════════════════════════════════════ */}
      <div className="relative z-10 hidden lg:flex
                      max-w-7xl mx-auto px-6 xl:px-8
                      py-12 xl:py-16
                      items-start gap-8">

        {/* LEFT — Logo + description, no panel */}
        <div className="flex flex-col gap-5 w-[280px] xl:w-[320px] shrink-0 pt-2">
          <Link href="/" className="hover:opacity-80 transition-opacity w-fit">
            <Image
              src={content.logo}
              alt={content.logoAlt}
              width={96}
              height={96}
              className="w-24 h-24 object-contain"
            />
          </Link>
          <p className="font-sora text-white/90
                        text-[14px] xl:text-[15px] leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* RIGHT — Frosted glass panel */}
        <div className="flex-1
                        rounded-2xl
                        bg-white/10 backdrop-blur-md
                        border border-white/15
                        px-8 xl:px-12 py-10
                        grid grid-cols-3 gap-6 xl:gap-10">

          {/* Col 1 — Discover */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sora font-semibold text-white
                           text-[15px] xl:text-[16px] mb-2">
              {content.discoverTitle}
            </h3>
            {content.discoverLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sora text-white/80 hover:text-white
                           text-[14px] xl:text-[15px]
                           transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 2 — Terms & Conditions */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sora font-semibold text-white
                           text-[15px] xl:text-[16px] mb-2">
              {content.termsTitle}
            </h3>
            {content.termsLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sora text-white/80 hover:text-white
                           text-[14px] xl:text-[15px]
                           transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 3 — Contact */}
          <div className="flex flex-col gap-4">
            {content.contactInfo.map((item) => (
              <ContactItem key={item.id} item={item} />
            ))}
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOBILE (<lg) — fully stacked, centered
      ════════════════════════════════════════════════════════ */}
      <div className="relative z-10 lg:hidden
                      flex flex-col items-center
                      px-4 sm:px-6 pt-10 pb-6 gap-8">

        {/* Logo + description */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src={content.logo}
              alt={content.logoAlt}
              width={72}
              height={72}
              className="w-18 h-18 object-contain"
            />
          </Link>
          <p className="font-sora text-white/85
                        text-[14px] sm:text-[15px] leading-relaxed
                        max-w-xs text-center">
            {content.description}
          </p>
        </div>

        {/* Frosted glass panel — links + contact */}
        <div className="w-full max-w-sm
                        rounded-2xl
                        bg-white/10 backdrop-blur-md
                        border border-white/15
                        px-6 py-8
                        flex flex-col items-center gap-7">

          {/* Discover */}
          <div className="flex flex-col items-center gap-2.5">
            <h3 className="font-sora font-semibold text-white text-[15px] mb-1">
              {content.discoverTitle}
            </h3>
            {content.discoverLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sora text-white/80 hover:text-white
                           text-[14px] sm:text-[15px]
                           transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Terms */}
          <div className="flex flex-col items-center gap-2.5">
            <h3 className="font-sora font-semibold text-white text-[15px] mb-1">
              {content.termsTitle}
            </h3>
            {content.termsLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sora text-white/80 hover:text-white
                           text-[14px] sm:text-[15px] text-center
                           transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3 w-full">
            {content.contactInfo.map((item) => (
              <ContactItem key={item.id} item={item} />
            ))}
          </div>

        </div>
      </div>

      {/* ── Copyright ─────────────────────────────────────────────────── */}
      <div className="relative z-10 pb-5 sm:pb-6">
        <p className="font-sora text-white/60 text-center
                      text-[12px] sm:text-[13px]">
          {content.copyright}
        </p>
      </div>

    </footer>
  )
}