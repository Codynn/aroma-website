"use client";

interface DescriptionProps {
  product: {
    additionalFields?: {
      origin?: string;
      ourIngredients?: string[];
      breweingGuide?: {
        hotBrew?: string[];
        coldBrew?: string[];
      };
    };
  };
}

export default function Description({ product }: DescriptionProps) {
  // Map API data
  const ingredientList = product.additionalFields?.ourIngredients || [];
  
  const hotBrewSteps = (product.additionalFields?.breweingGuide?.hotBrew || []).map(
    (text, index) => ({
      step: `Step${index + 1}`,
      text: text,
    })
  );

  const coldBrewSteps = (product.additionalFields?.breweingGuide?.coldBrew || []).map(
    (text, index) => ({
      step: `Step${index + 1}`,
      text: text,
    })
  );

  const hasBrewingGuide = hotBrewSteps.length > 0 || coldBrewSteps.length > 0;
  const originText = product.additionalFields?.origin;

  return (
    <div className="max-w-7xl mx-auto font-sora w-full py-10 px-4 lg:px-0">
      <div className="container flex flex-col gap-[32px] lg:gap-[48px]">
        
        {/* Our Ingredients - Only shows if list is not empty */}
        {ingredientList.length > 0 && (
          <div className="ingredients flex flex-col lg:gap-[24px] gap-[18px]">
            <h1 className="text-[24px] lg:text-[28px] font-bold text-[#111]">Our Ingredients</h1>
            <ul className="flex flex-col md:flex-row flex-wrap list-disc pl-5 md:pl-0 gap-y-2 gap-x-6 lg:gap-x-[42px] marker:text-[#77923B]">
              {ingredientList.map((item, id) => (
                <li key={id} className="text-[#333] font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Brewing Guide - Only shows if at least one brew type exists */}
        {hasBrewingGuide && (
          <div className="brewing-guide flex flex-col lg:gap-[24px] gap-[18px]">
            <h1 className="text-[24px] lg:text-[28px] font-bold text-[#111]">Brewing Guide</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
              {/* Hot Brew Column */}
              {hotBrewSteps.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-[18px] font-bold text-[#333]">Hot Brew</h3>
                  <div className="flex flex-col gap-3">
                    {hotBrewSteps.map((item, idx) => (
                      <p key={idx} className="text-[15px] lg:text-[16px] text-[#444] leading-snug">
                        <span className="font-bold">{item.step}:</span> {item.text}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Cold Brew Column */}
              {coldBrewSteps.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-[18px] font-bold text-[#333]">Cold Brew</h3>
                  <div className="flex flex-col gap-3">
                    {coldBrewSteps.map((item, idx) => (
                      <p key={idx} className="text-[15px] lg:text-[16px] text-[#444] leading-snug">
                        <span className="font-bold">{item.step}:</span> {item.text}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Origin Section - Only displays if origin data exists in additionalFields */}
        {originText && (
          <div className="origin flex flex-col lg:gap-[24px] gap-[18px]">
            <h1 className="text-[24px] lg:text-[28px] font-bold text-[#111]">Origin</h1>
            <div className="flex flex-col gap-5 text-[#444444] text-[15px] lg:text-[16px] leading-[1.6]">
              {/* The actual origin text from API */}
              <p className="ext-[15px] lg:text-[16px] leading-[1.6] ">
                {originText}
              </p>

              {/* Static descriptive paragraphs */}
              
            </div>
          </div>
        )}

      </div>
    </div>
  );
}