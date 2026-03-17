import { ArrowRight, Package, Ship, Truck } from "lucide-react";
import Link from "next/link";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar/>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-linear-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">Global Import & Export <br/>
            <span className="text-blue-900">Made Simple</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Manage your shipments, track logistics, and handle customs documentation 
              all from one intuitive dashboard.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link 
              href="/register" 
              className="w-full sm:w-auto bg-blue-900 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors flex items-center justify-center">
              Start Shipping <ArrowRight className="ml-2 h-4 w-4"/>
              </Link>
              
              <Link 
              href="#learn-more" 
              className="w-full sm:w-auto bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-b-md font-medium hover:bg-gray-50 transition-colors">
              Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Services</h2>
              <p className="text-gray-600">Everything you need to move goods across borders.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="p-6 border border-[#847d7d] rounded-lg hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-900 mb-4">
                  <Package className="h-6 w-6"/>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-600">Import Management</h3>
                <p className="text-gray-600">Streamline your inbound logistics with automated documentation and clearance.</p>
              </div>

              {/* Card 2 */}
              <div className="p-6 border border-[#847d7d] rounded-lg hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-900 mb-4">
                  <Ship className="h-6 w-6"/>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-600">Export Solutions</h3>
                <p className="text-gray-600">Reach new markets with compliant export strategies and freight forwarding.</p>
              </div>

              {/* Card 3 */}
              <div className="p-6 border border-[#847d7d] rounded-lg hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-900 mb-4">
                  <Truck className="h-6 w-6"/>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-600">Real-time Tracking</h3>
                <p className="text-gray-600">Know exactly where your cargo is with our live GPS tracking integration.</p>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}