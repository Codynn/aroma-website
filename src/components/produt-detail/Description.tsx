export default function Description() {
  const ingredientList = [
    "1st Ingredients",
    "1st Ingredients",
    "1st Ingredients",
    "1st Ingredients",
    "1st Ingredients",
  ];

  const hotBrewSteps = [
    { step: "Step1", text: "Place 1 Tea Spoon Leaves in a Cup or Tea Pot" },
    { step: "Step2", text: "Pour 7fl. oz (200 ml) Freshly Boiled Water over the Leaves" },
    { step: "Step3", text: "Water Temperature - 194°F-212°F | 90°C-100°C" },
    { step: "Step4", text: "Brew for 3-5 mins & Strain the Leaves" },
    { step: "Step5", text: "Can be served with or without milk" },
    { step: "Step6", text: "Place 1 Tea Spoon Leaves in a Cup or Tea Pot" },
  ];

  const coldBrewSteps = [
    { step: "Step1", text: "For Iced Tea, use 2 Tea Spoons & Brew for 5 mins" },
    { step: "Step2", text: "Pour 7fl.Refrigerate for 3-4 hours. Add ice cubes & sweetener oz (200 ml) Freshly Boiled Water over the Leaves" },
  ];

  return (
    <div className="max-w-7xl mx-auto font-sora w-full py-10 px-4 lg:px-0">
      <div className="container flex flex-col gap-[32px] lg:gap-[48px]">
        
        {/* Our Ingredients */}
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

        {/* Brewing Guide */}
        <div className="brewing-guide flex flex-col lg:gap-[24px] gap-[18px]">
          <h1 className="text-[24px] lg:text-[28px] font-bold text-[#111]">Brewing Guide</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
            {/* Hot Brew Column */}
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

            {/* Cold Brew Column */}
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
          </div>
        </div>

        {/* Origin Section */}
        <div className="origin flex flex-col lg:gap-[24px] gap-[18px]">
          <h1 className="text-[24px] lg:text-[28px] font-bold text-[#111]">Origin</h1>
          <div className="flex flex-col gap-5 text-[#444] text-[15px] lg:text-[16px] leading-[1.6]">
            <p>
              Hand-harvested at peak freshness and gently processed to preserve natural antioxidants and delicate flavor.
            </p>
            <p>
              Our Kumari Gold black tea, also known as golden tips, is crafted through an intricate process that elevates it beyond standard black teas. This specialty tea starts with the careful plucking of just one or two tender leaves and the terminal bud during the second flush (summer). The freshly hand-harvested leaves are withered for several hours to remove moisture while maintaining their delicate structure for the rolling stage.
            </p>
            <p>
              The rolling process, which lasts 20-25 minutes, involves multiple stages of low to high pressure. This delicate handling ensures that the leaves remain intact while releasing their essential oils and aromatic compounds. The tea then undergoes oxidation for 8-10 hours, a process where the leaves are frequently turned and repositioned. This crucial step not only develops the rich golden color of the buds but also intensifies the flavors and aromas.
            </p>
            <p>
              Once the optimal aroma is achieved, the leaves are dried to capture and preserve the complex flavors. The result is a full-bodied, high-quality black tea with captivating caramel and brown sugar aromas, complemented by pronounced baked fruit and honey flavors and an earthy, long-lasting finish.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}