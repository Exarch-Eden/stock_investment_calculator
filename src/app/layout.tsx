import { Metadata } from "next"
import React from "react"

import "./globals.css"

export const metadata: Metadata = {
    title: "Calculator",
    description: "Daily Investment Stock Calculator"
}

const RootLayout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

export default RootLayout