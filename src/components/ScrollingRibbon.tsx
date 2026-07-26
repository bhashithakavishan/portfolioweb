import React from 'react'

type Props = {
  items: string[]
  speed?: number // seconds for one loop
}

export default function ScrollingRibbon({ items, speed = 20 }: Props) {
  const wrapperStyle: React.CSSProperties = {
    width: '100vw',
    marginLeft: '0',
    marginBottom: '-1rem',
  }

  return (
    <section className="w-full overflow-visible">
      <div className="marquee-wrapper" style={wrapperStyle}>
        <div className="marquee bg-brand text-white">
          <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
            <div className="marquee-group flex items-center gap-5 whitespace-nowrap px-6 py-3 font-semibold tracking-wider" style={{ minHeight: '3rem' }}>
              {items.map((it) => (
                <span key={it} className="flex items-center gap-3">
                  <span className="uppercase text-base">{it}</span>
                  <span className="text-2xl opacity-95">✦</span>
                </span>
              ))}
            </div>

            {/* duplicate for seamless loop */}
            <div className="marquee-group flex items-center gap-5 whitespace-nowrap px-6 py-3 font-semibold tracking-wider" style={{ minHeight: '3rem' }}>
              {items.map((it) => (
                <span key={it + '-dup'} className="flex items-center gap-3">
                  <span className="uppercase text-base">{it}</span>
                  <span className="text-2xl opacity-95">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
