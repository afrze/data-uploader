import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Header from '../../components/Header';

import Home from '../Home';
import StepsContainer from '../StepsContainer';
import FileSelect from '../StepsContainer/FileSelect';
import Preview from '../StepsContainer/Preview';
import Upload from '../StepsContainer/Upload';
import Authenticate from '../StepsContainer/Authenticate';
import MapPreview from '../StepsContainer/MapPreview'

const AppContainer = () => {
  return (
    <div className="bg-gray-200 flex flex-col h-screen">
      <Header className="flex h-32 bg-gray-200" />

      <div className="flex-1 mx-auto mb-4 h-full p-6 rounded-lg shadow-lg bg-white container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="steps/" element={<StepsContainer />}>
            <Route path="select/" element={<FileSelect />} />
            <Route path="preview/" element={<Preview />} />
            <Route path="authenticate/" element={<Authenticate />} />
            <Route path="upload/" element={<Upload />} />
            <Route path="map/" element={<MapPreview />} />
          </Route>
          <Route
            path="*"
            element={
              <main className="text-center">
                <div className="px-2 py-4 sm:px-6 sm:py-10 text-center">
                  <div className="w-4/4 sm: mx-auto mt-20">
                    <p>There's nothing here!</p>
                    <Link to={'/'}>Go Home</Link>
                  </div>
                </div>
              </main>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AppContainer;
