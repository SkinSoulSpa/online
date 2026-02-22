import React from 'react';
import { Helmet } from 'react-helmet-async';
import defaultImage from '../assets/sanctuary-hero.jpg';

const SEO = ({ 
  title, 
  description, 
  name = "Skin Soul Spa", 
  type = "website", 
  url = "https://www.skinsoulspa.sg",
  image
}) => {
  const siteTitle = title ? `${title} | ${name}` : name;
  const metaDescription = description || "A private ritual of self-reverence in a hidden Orchard gem. Experience bespoke facials, body therapies, and soul-deep restoration.";
  
  // Ensure image is an absolute URL
  const resolveImage = (img) => {
    if (!img) return `https://www.skinsoulspa.sg${defaultImage}`;
    if (img.startsWith('http')) return img;
    return `https://www.skinsoulspa.sg${img}`;
  };

  const metaImage = resolveImage(image);
  
  // JSON-LD Schema for Local Business
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    "name": "Skin Soul Spa",
    "description": metaDescription,
    "image": [
      metaImage
    ],
    "url": "https://www.skinsoulspa.sg",
    "telephone": "+6593633111",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "9 Scotts Road, Pacific Plaza, #03-01",
      "addressLocality": "Singapore",
      "postalCode": "228210",
      "addressCountry": "SG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 1.3068, // Approx lat for Pacific Plaza
      "longitude": 103.8326 // Approx long for Pacific Plaza
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "11:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "19:00"
      }
    ],
    "priceRange": "$$"
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Structured Data */}
      <script type='application/ld+json'>
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;
