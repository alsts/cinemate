import { Voting } from "./Voting";

interface PollIdPageProps {
	params: {
		poll_id: string;
	};
}

const PollIdPage = async ({ params }: PollIdPageProps) => {

	// TODO: check if poll belongs to user?! - if not redirect

	return (
		<div className="p-5 h-full space-y-2 overflow-x-auto">
			<h2>Poll {params.poll_id}</h2>
			<Voting/>
		</div>
	);
};

export default PollIdPage;
