import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './App.jsx'
import AfrApp from './afr/afrapp.tsx';
import AfrHome from './afr/afrhome.tsx';
import AfrPages from './afr/pages/afrpages.tsx';;
import afrtrn from './afr/pages/arftrn.tsx';
import BreakthroughPreview from './afr/breakthroughpreview.tsx';

const router = createBrowserRouter([
  {
    path: "/afr",
    Component: AfrApp,
    children: [
      {path: "home", Component: AfrHome,},
      {path: "page", Component: AfrPages,children: [
        {path: "trn", Component: afrtrn}
      ]},
    ]
  },
  {
    path: "/breakthroughpreview",
    Component: BreakthroughPreview,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <div className="mdt-container">
      <div className='overlay-container'>
        <img src="/toughbook-frame.png" alt="Frame" className="overlay-image"/>
      </div>
      <div className='app-container'>
        <RouterProvider router={router} />
      </div>
    </div>
  </StrictMode>,
)
