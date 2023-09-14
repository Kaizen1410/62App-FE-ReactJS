import { Toast } from "flowbite-react"
import { UserState } from "../context/UserProvider"
import { useEffect } from "react";

const Notif = () => {
  const { notif } = UserState();

  return (
    <div className="absolute right-10 bottom-10 flex flex-col gap-2">
      {notif.map((n, i) => (
        n.type==='success'
        ? <SuccessNotif key={`${n.type}-${i}`} notif={n} />
        : <FailureNotif key={`${n.type}-${i}`} notif={n} />
      ))}
    </div>
  )
}

const SuccessNotif = ({ notif }) => {
  const { setNotif } = UserState();

  useEffect(() => {
    const removeNotif = () => {
      setNotif(prev => prev.filter(p => p !== notif));
    }

    setTimeout(removeNotif, 4000);

    return () => {
      clearTimeout(removeNotif);
    }
  }, [setNotif, notif]);

  return (
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <i className="fa-solid fa-check text-green-600 dark:text-green-400"></i>
      </div>
      <div className="ml-3 text-sm font-normal">
        {notif.message}
      </div>
      <Toast.Toggle />
    </Toast>
  )
}

const FailureNotif = ({ notif }) => {
  const { setNotif } = UserState();

  useEffect(() => {
    const removeNotif = () => {
      setNotif(prev => prev.filter(p => p !== notif));
    }

    setTimeout(removeNotif, 4000);

    return () => {
      clearTimeout(removeNotif);
    }
  }, [setNotif, notif]);

  return (
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <i className="fa-solid fa-x text-red-700 dark:text-red-500"></i>
      </div>
      <div className="ml-3 text-sm font-normal">
        {notif.message}
      </div>
      <Toast.Toggle />
    </Toast>
  )
}

export default Notif