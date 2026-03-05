import { OrganizationList } from "@clerk/nextjs";
import { Organization } from "@clerk/nextjs/server";

export default async function OrgSelectionPage() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <OrganizationList 
            hidePersonal
            afterCreateOrganizationUrl="/"
            afterSelectOrganizationUrl="/"
            appearance={{
                elements: {
                    rootBox: "mx-auto",
                    card: "shadow-lg",
                },
            }}
            />
        </div> 
    )
}
