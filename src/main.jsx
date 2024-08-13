import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import MusicPage from "./pages/MusicPage.jsx";
import {ThemeProvider} from 'next-themes'
import SearchPage from "@/pages/SearchPage.jsx";
import ProfilePage from "@/pages/ProfilePage.jsx";
import IndexPage from "@/pages/IndexPage.jsx";
import CommunityPage from "@/pages/CommunityPage.jsx";
import MusicsShowPage from "@/pages/MusicsShowPage.jsx";
import RankingsPage from "@/pages/RankingsPage.jsx";
import MusicsIndexPage from "@/pages/MusicsIndexPage.jsx";
import PlaylistDetailPage from "@/pages/PlaylistDetailPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <IndexPage/>
            },
            {
                path: "search",
                element: <SearchPage/>,
            },
            {
                path: "community",
                element: <CommunityPage/>,
            },
            {
                path: "profile",
                element: <ProfilePage/>,
            },
        ],
    },
    {
        path: "musics",
        element: <MusicsIndexPage/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '',
                element: <MusicsShowPage/>
            },
            {
                path: ":id",
                element: <MusicPage/>,
            },
            {
                path: 'rankings',
                element: <RankingsPage/>
            },
            {
                path: "list/detail/:id",
                element: <PlaylistDetailPage/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/*<App />*/}
        <ThemeProvider>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>,
)
