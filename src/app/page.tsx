import Candidate from './components/Exam/Candidate';
import ExamBoard from './components/Exam/ExamBoard';
import NavBar from './components/NavBar';

export default function Home() {
  return (
    <>
      <NavBar />
      <main className='flex flex-col'>
        {/* <h1>Welcome to the Home Page</h1> */}
        <Candidate/>
        <ExamBoard/>
      </main>
    </>
  );
}
