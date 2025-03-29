import React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import profileImage from "@/assets/burner-911030_1280.jpg";
import NewsFlash from '@/components/newsflash';

const StoryPage = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-grow h-full w-full rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50} className="h-full overflow-hidden">
          <ResizablePanelGroup direction="vertical" className="h-full flex-grow">
            <ResizablePanel defaultSize={25} className="h-full overflow-y-auto px-4">
            <div className="h-full">
                <div className="flex h-full items-start justify-between p-6">
                  <div className='flex flex-col items-start'>
                    <h1 className="ml-1.5 font-bold">News Aggregator</h1>
                    <span className='m-0 p-0'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, dolore?...</span>
                  </div>
                  <img src={profileImage} className="w-[200px] h-[120px] object-cover rounded-lg" />
                </div>
                <div>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde dolorum, voluptatibus ratione praesentium culpa nihil porro quae quidem, modi inventore sapiente nobis quibusdam corrupti maiores atque repellendus veniam consequuntur beatae nostrum et mollitia doloremque! Dicta nemo adipisci debitis dolorum, distinctio ut quasi rerum praesentium, pariatur saepe nihil veritatis eius maiores rem animi fugit et molestiae alias? In voluptate quos optio vero est necessitatibus provident minus incidunt, aspernatur amet ipsam beatae sequi consequuntur ducimus inventore omnis consequatur soluta? Expedita ut perferendis excepturi minima molestias temporibus veritatis blanditiis, accusantium est hic, facere possimus laudantium eaque eos. Accusamus, quam quaerat! Ab, ducimus aliquam.
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75} className="h-full overflow-hidden">
              <div className="flex flex-col items-start h-full overflow-y-auto px-4">
                {/* ✅ Centered and bold "Similar News Articles" text */}
                <div className="flex items-center justify-center w-full font-bold text-lg my-4">
                  Similar News Articles
                </div>
                <div className="flex flex-col w-full space-y-4">
                  <NewsFlash />
                  <NewsFlash />
                  <NewsFlash />
                  <NewsFlash />
                  <NewsFlash />
                  <NewsFlash />
                  <NewsFlash />
                  <NewsFlash />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} className="h-full">
          <div className="flex h-full items-center justify-center p-6">
            <span>One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
      </ResizablePanelGroup>
    </div>
  );
};

export default StoryPage;
