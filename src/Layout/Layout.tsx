import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import useWindowDimensions from "../hooks/useWindowDimension";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setNavOpen } from "../redux/contacts/contactsSlice";

interface IProps {
  children: React.ReactNode;
}
const Layout = ({ children }: IProps) => {
  const { width } = useWindowDimensions();
  const selector: any = useSelector<RootState>(
    (state) => state.contacts
  );
  const navOpen = selector.navOpen
  const dispatch = useDispatch();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  let screensize = 768;
  useEffect(() => {
    if (width < screensize) {
      setIsNavExpanded(true);
      dispatch(setNavOpen(false));
    } else {
      setIsNavExpanded(false);
      dispatch(setNavOpen(true));
    }
  }, [width]);
  console.log(navOpen, "check")
  return (
    <div>
      <Header />
      <div className="flex flex-col sm:flex-row">
        {
          <div className={`w-full sm:w-1/4 ${isNavExpanded ? navOpen ? "" : "hidden" : ""}`}>
            <Sidebar />
          </div>
        }

        <div className="container mx-auto mt-12 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32">
          {
            isNavExpanded && <button
              className="absolute top-4 right-4 z-50 p-2 rounded-md bg-gray-800 text-white"
              onClick={() => dispatch(setNavOpen(!navOpen))}
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {navOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>

            </button>
          }

          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
