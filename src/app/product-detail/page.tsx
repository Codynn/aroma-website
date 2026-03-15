import ReviewsSection from "@/components/produt-detail/CustomerReviews"
import Description from "@/components/produt-detail/Description"
import HowToBrew from "@/components/produt-detail/how-to-brew"
import ProductDetail from "@/components/produt-detail/Top-Section"
import RelatedProducts from "@/components/produt-detail/you-might-also-like"
export default function page(){
    return(
        <div className="flex flex-col gap-6">
            <ProductDetail />
            <Description />
            <HowToBrew />
            <ReviewsSection />
            <RelatedProducts />
        </div>
    )
}