export function WhatsIncluded() {
  return (
    <div className="flex w-full max-w-[1440px] flex-col space-y-20 bg-black px-8 pt-12">
      <div className="grid grid-cols-2">
        <div className="flex w-full flex-col font-display text-3xl text-white md:text-5xl lg:text-6xl">
          <p>What&apos;s included?</p>
        </div>

        <div className="text-md font-sans text-white">
          <p className="font-bold">Base Camp Curriculum</p>
          <p>
            Participants will work through the{' '}
            <a href="https://docs.base.org/base-camp/docs/welcome/">Base Camp</a> content, which is
            publicly available. However, as part of the Base Bootcamp program, they will also have
            access to supplemental resources and graded projects, reviewed by Coinbase engineers.
          </p>
          <br />
          <p className="font-bold">Mentors</p>
          <p>Each student is paired with a mentor whom you will meet with once a week.</p>
          <br />
          <p className="font-bold">Office Hours</p>
          <p>
            Base Bootcamp staff will host regular open office hours via Google Meet to answer
            questions.
          </p>
          <br />
          <p className="font-bold">Discord</p>
          <p>
            All students will have access to a private channel in the Base Discord where they can
            interact with Coinbase staff, mentors and other Base Bootcamp students.
          </p>
        </div>
      </div>
    </div>
  );
}
