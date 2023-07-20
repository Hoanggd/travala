import { ReactElement } from "react"

import DashboardLayout from "@/layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"

const Page: NextPageWithLayout = () => {
	return <div>Accounting</div>
}

Page.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>
}

export default Page
