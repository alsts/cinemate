import WebApp from '@twa-dev/sdk';
import { useTelegramContext } from '../context/TelegramContext';

const handleInviteFriends = () => {
  WebApp.HapticFeedback.impactOccurred('medium');
  WebApp.openTelegramLink('https://t.me/share/url?url=https://t.me/CinamateBot/cinemate&text=Check out Cinemate - Your Movie Companion!');
};

export const TopBar = () => {
  const { user, isLoading } = useTelegramContext();

  if (isLoading) {
    return (
      <div className="h-14 bg-black">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-14 bg-black">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          {user?.photo_url ? (
            <img
              src={user.photo_url}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {user?.first_name.charAt(0)}
            </div>
          )}
          <span className="text-white">
            {user?.username || user?.first_name}
          </span>
        </div>
        <button
          onClick={handleInviteFriends}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
          aria-label="Invite Friends"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span className="text-sm font-medium">Invite Friends</span>
        </button>
      </div>
    </div>
  );
};
