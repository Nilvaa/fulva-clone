import React from 'react'
import './MarketplaceSection.css'

import amazonLogo from '../assets/images/amazon.png'
import flipkartLogo from '../assets/images/flipkart.png'
import meeshoLogo from '../assets/images/meesho.png'
import blinkitLogo from '../assets/images/blinkit.png'
import instamartLogo from '../assets/images/instamart.png'

const marketplaces = [
  {
    name: 'Amazon',
    logo: amazonLogo,
  },
  {
    name: 'Flipkart',
    logo: flipkartLogo,
  },
  {
    name: 'Meesho',
    logo: meeshoLogo,
  },
  {
    name: 'Blinkit',
    logo: blinkitLogo,
  },
  {
    name: 'Instamart',
    logo: instamartLogo,
  },
]

export default function MarketplaceSection() {
  return (
    <section className="marketplace-section">
      <div className="marketplace-container">

        {/* SECTION TITLE */}
        <div className="marketplace-heading-side">
          <span className="marketplace-subheading">
            AVAILABLE ACROSS INDIA
          </span>
        </div>

        {/* MARKETPLACE CARDS */}
        <div className="marketplace-cards-wrapper">
          <div className="marketplace-cards-scroll">

            {marketplaces.map((item) => (
              <div
                key={item.name}
                className="marketplace-card"
              >
                <span className="marketplace-card-label">
                  SHOP ON
                </span>

                <div className="marketplace-logo-wrap">
                  <img
                    src={item.logo}
                    alt={item.name}
                  />
                </div>
              </div>
            ))}

            {/* STORES CARD */}
            <div className="marketplace-card marketplace-card-store">

              <span className="marketplace-card-label">
                FIND IN
              </span>

              <div className="marketplace-store-body">

                <svg
                  className="marketplace-pin-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6.5-8 12-8 12S4 16.5 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                <span className="marketplace-store-title">
                  Stores near you
                </span>

                <span className="marketplace-arrow">
                  →
                </span>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}