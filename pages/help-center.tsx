import { ReactElement } from "react"

import { NextPageWithLayout } from "@/pages/_app"

import DashboardLayout from "@/layouts/DashboardLayout"

const Page: NextPageWithLayout = () => {
	return <div>Help Center</div>
}

Page.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>
}

export default Page
