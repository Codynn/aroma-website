import OriginPeople from "@/components/about/Origin";
import StoryTimeline from "@/components/about/Step";
import TeamSection from "@/components/about/Team";
import TopDescription from "@/components/about/Top-Description";

export default function page(){
    return (
        <div className="flex flex-col gap-6">
            <TopDescription />
            <StoryTimeline />
            <OriginPeople />
            <TeamSection />
        </div>
    )
}