import { Routes, Route } from 'react-router-dom'
import AppHeader from '../app-header/app-header'
import { Home, NotFound } from '../../pages'

export default function App() {
    return (
        <div>
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}
