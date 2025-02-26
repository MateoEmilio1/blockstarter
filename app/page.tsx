import CoreComponent from './components/CoreComponent'
import EventTable from './components/EventTable'
import AnimatedBackgroundShapes from './components/AnimatedBackgroundShapes'

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden relative min-h-screen bg-slate-900 p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AnimatedBackgroundShapes />

      <main className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-8 items-center">
        <CoreComponent />
        <EventTable />
      </main>
    </div>
  )
}
Home.displayName = 'Home'
export default Home
