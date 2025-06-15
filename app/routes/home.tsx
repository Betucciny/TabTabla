import { Form, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { createGame, joinGame } from "~/.server/game";
import { commitSessionCookie, getSessionCookie } from "~/.server/cookies";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TabTabla Lotería" },
    { name: "description", content: "Juego de Lotería" },
  ];
}

interface ActionErrorData {
  error: boolean;
  message: string;
}

export async function action({
  request,
}: {
  request: Request;
}): Promise<ActionErrorData | Response> {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "createGame") {
    const playerName = formData.get("playerName") as string;
    const result = await createGame(playerName);

    if (!result.success || !result.data) {
      return {
        error: true,
        message: result.error || "Unknown error",
      };
    }
    const session = await getSessionCookie(request.headers.get("Cookie"));
    session.set("playerId", result.data.playerId);
    return redirect(`/game/${result.data.shortCode}`, {
      headers: {
        "Set-Cookie": await commitSessionCookie(session),
      },
    });
  } else if (intent === "joinGame") {
    const shortCode = formData.get("shortCode") as string;
    const playerName = formData.get("playerName") as string;
    const result = await joinGame(shortCode, playerName);
    if (!result.success || !result.data) {
      return {
        error: true,
        message: result.error || "Unknown error",
      };
    }

    const session = await getSessionCookie(request.headers.get("Cookie"));
    session.set("playerId", result.data.playerId);
    return redirect(`/game/${result.data.shortCode}`, {
      headers: {
        "Set-Cookie": await commitSessionCookie(session),
      },
    });
  }

  throw new Response("Invalid form submission intent", { status: 400 });
}

export default function LandingPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();

  const isCreating = navigation.formData?.get("intent") === "createGame";
  const isJoining = navigation.formData?.get("intent") === "joinGame";

  const [joinCode, setJoinCode] = useState("");
  const [playerName, setPlayerName] = useState("");

  const [timeout, setTimeoutState] = useState(true);

  const { error, message } = actionData || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutState(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-white bg-loteria-blue">
      <h1
        className="mb-8 animate-fade-in-down text-6xl font-bold
                   [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]"
      >
        TabTabla Lotería
      </h1>

      <div
        className={`transition-all duration-2000 ease-in-out ${
          timeout ? "opacity-0" : "opacity-100"
        }`}
      >
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
            <p className="text-center text-sm font-medium">{message}</p>
          </div>
        )}
        {/* Section to Create a New Game */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-loteria-cream p-4 ">
          <h3 className="mb-4 text-center text-2xl font-bold text-loteria-blue">
            Soy el Anfitrión
          </h3>
          <Form method="post">
            <input type="hidden" name="intent" value="createGame" />
            <div className="mb-6">
              <label
                htmlFor="playerName"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Tu Nombre:
              </label>
              <input
                type="text"
                id="playerName"
                name="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full appearance-none rounded border px-3 py-2 text-gray-700
                                       leading-tight shadow focus:outline-none focus:shadow-outline"
                placeholder="Tu Apodo Aquí"
                maxLength={20}
                required
                disabled={isJoining}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-loteria-orange px-4 py-3 text-lg font-bold
                         text-white transition duration-300 ease-in-out
                         hover:scale-105 transform"
              disabled={isCreating}
            >
              {isCreating ? "Creando Partida..." : "Crear Nueva Partida"}
            </button>
          </Form>
          {actionData?.error && isCreating && (
            <p className="mt-2 text-center text-sm text-red-500">
              Error: {actionData.message}
            </p>
          )}
        </div>

        {/* Section to Join an Existing Game */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-4 text-center text-2xl font-bold text-loteria-blue">
            Unirme a una Partida
          </h3>
          <Form method="post">
            <input type="hidden" name="intent" value="joinGame" />
            <div className="mb-4">
              <label
                htmlFor="shortCode"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Código de la Partida:
              </label>
              <input
                type="text"
                id="shortCode"
                name="shortCode"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className="w-full appearance-none rounded border px-3 py-2 text-center
                           text-xl font-mono tracking-widest uppercase text-gray-700
                           leading-tight shadow focus:outline-none focus:shadow-outline"
                placeholder="EJ. ABCD"
                maxLength={10}
                required
                disabled={isJoining}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="playerName"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Tu Nombre:
              </label>
              <input
                type="text"
                id="playerName"
                name="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full appearance-none rounded border px-3 py-2 text-gray-700
                           leading-tight shadow focus:outline-none focus:shadow-outline"
                placeholder="Tu Apodo Aquí"
                maxLength={20}
                required
                disabled={isJoining}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-loteria-orange px-4 py-3 text-lg font-bold
                         text-white transition duration-300 ease-in-out
                         hover:scale-105 transform"
              disabled={isJoining}
            >
              {isJoining ? "Uniéndome..." : "Unirse al Juego"}
            </button>
          </Form>
          {actionData?.error && isJoining && (
            <p className="mt-2 text-center text-sm text-red-500">
              Error: {actionData.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
