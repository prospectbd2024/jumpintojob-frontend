"use client"
import Companies from "@/Components/Companies/Companies"
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
    const pathname = usePathname();

    // Define a regex to match the routes
    const layoutRouteRegex = /(companies(\/)?$)|(categories)/;
    const isLayoutRoute = layoutRouteRegex.test(pathname);

    return (isLayoutRoute ?
        <Companies>
            {children}
        </Companies> :
        <>{children}</>
    );
}
