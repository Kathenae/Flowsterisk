import 'reactflow/dist/style.css';
import Tabs from '../components/Tabs';

export default function Home(){
   return (
      <div className='w-screen h-screen overflow-hidden'>
         <h1>Home</h1>
         <Tabs>
            <Tabs.Panel name='Home'>
               <h1>Home Tab</h1>
            </Tabs.Panel>
            <Tabs.Panel name='Work'>
               <h1>Work Tab</h1>
            </Tabs.Panel>
            <Tabs.Panel name='Play'>
               <h1>Play Tab</h1>
            </Tabs.Panel>
         </Tabs>
      </div>
    );
}