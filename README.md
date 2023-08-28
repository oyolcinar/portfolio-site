Link: http://olgunyolcinar.com

My personal website made with Next.js.

It is kind of a passion project to re-create the Win98 OS feel within the browser. The project kind of "grew in the telling" or in this case, coding because of that. Since every little detail like program minimization, order of execution, window size and position required its own state. 

Therefore the project employs some complex states and state management to recreate the authentic OS feel. Since it's a personal project I refrained from using TypeScript. Also time constraints (other works and the desire to make it up and running in short notice) kept from refactoring extensively and I allowed myself to "flow" in order to deliver the functionality in time. However I still believe the code is fairly understandable and modular.

So far some of the features are missing. Like the minesweeper game, MS Paint and the Winamp player. But since it's quite modular, they can be implemented as I go along. Plus it's REALLY a pain in the glutes to find high-quality images for UI. I had to screenshot and crop all the buttons from archaic Win98 tutorials in order to use them on Internet Explorer component for instance. So there's that. I believe MS Paint will be the same.

The project uses React Draggable custom component which made it easier for me to implement the dragging feature. However, since it's an outside library it caused some hickups regarding that smooth OS experience. I wanted to make some of the "programs" or the components draggable AND resiable, which caused some issues. Resizable components have to be double-clicked in order to be dragged.

Other than that new files can be created, saved, deleted and overwritten. Oh, and you can email me using that Sendgrid API.





