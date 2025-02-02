import { DashboardHeader } from "@/components/header/DashboardHeader";
import { PomodoContainer } from "@/components/pomodoro/timer/PomodoroContainer";
import { getUserPomodoroSettings } from "@/lib/api";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

const Pomodoro = async () => {
  const session = await checkIfUserCompletedOnboarding(`/dashboard/pomodoro`);

  const pomodoroSettings = await getUserPomodoroSettings(session.user.id);
  return (
    <>
      <DashboardHeader>
        {/* <AddTaskShortcut userId={session.user.id} /> */}
      </DashboardHeader>
      <main className="flex flex-col gap-2 h-full items-center">
        <PomodoContainer pomodoroSettings={pomodoroSettings} />
      </main>
    </>
  );
};

export default Pomodoro;
