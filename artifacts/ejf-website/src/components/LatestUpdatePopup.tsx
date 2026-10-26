import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, MapPin, X } from "lucide-react";
import { Link } from "wouter";

const STORAGE_KEY = "ejf:announcement:mwatate-youth-assessment:v1";
const STORY_URL = "/insights/youth-state-social-contract-assessment";

export default function LatestUpdatePopup({ userId }: { userId: string | null }) {
  const [openForUser, setOpenForUser] = useState<string | null>(null);
  const storageKey = userId ? `${STORAGE_KEY}:${userId}` : null;
  const isOpen = Boolean(userId && openForUser === userId);

  useEffect(() => {
    if (!userId || !storageKey) {
      setOpenForUser(null);
      return;
    }

    try {
      setOpenForUser(localStorage.getItem(storageKey) === "seen" ? null : userId);
    } catch (error) {
      console.error("Could not read the latest-update preference from local storage.", error);
      setOpenForUser(userId);
    }
  }, [storageKey, userId]);

  const markAsSeen = () => {
    if (!userId || !storageKey) return;

    try {
      localStorage.setItem(storageKey, "seen");
    } catch (error) {
      console.error("Could not save the latest-update preference to local storage.", error);
    }

    setOpenForUser(null);
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) markAsSeen();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[10000] bg-[#061128]/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[10001] grid max-h-[min(90vh,680px)] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 grid-cols-1 overflow-y-auto rounded-[28px] border border-white/60 bg-white shadow-2xl focus:outline-none sm:max-h-[min(88vh,620px)] md:grid-cols-[0.9fr_1.1fr] md:overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="relative min-h-[210px] overflow-hidden sm:min-h-[250px] md:min-h-[520px]">
            <img
              src="/images/mwatate-huria-youth-group.webp"
              alt="Young people gathered for the EJF and HURIA assessment in Mwatate."
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08152F]/80 via-[#08152F]/10 to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-xs font-bold uppercase tracking-[0.18em] text-white/90">
              Youth participation · Taita Taveta
            </p>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close latest update"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#08152F]/70 text-white transition-colors hover:bg-[#08152F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex flex-col justify-center px-6 py-7 sm:px-9 sm:py-9 md:px-10">
            <span className="inline-flex w-fit items-center rounded-full border border-[#C9A24A]/30 bg-[#C9A24A]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B6A22]">
              Latest EJF update
            </span>
            <Dialog.Title className="mt-5 text-2xl font-extrabold leading-tight text-[#08152F] sm:text-3xl">
              Young people’s voices must count
            </Dialog.Title>
            <Dialog.Description className="mt-4 text-sm leading-7 text-[#415067] sm:text-base">
              EJF and Human Rights Agenda (HURIA) spent two days with young
              people in Mwatate, gathering their perspectives on governance,
              accountability and the relationship between youth and the State.
            </Dialog.Description>

            <div className="mt-5 flex items-start gap-2 text-sm font-semibold text-[#08152F]/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A24A]" aria-hidden="true" />
              <span>ACK St. James Social Hall, Mwatate</span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={STORY_URL}
                onClick={markAsSeen}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A24A] px-5 py-3 text-sm font-bold text-[#08152F] shadow-md shadow-[#C9A24A]/20 transition-all hover:-translate-y-0.5 hover:bg-[#d8b45f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08152F] focus-visible:ring-offset-2"
              >
                View the latest update
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-xl px-5 py-3 text-sm font-semibold text-[#08152F]/65 transition-colors hover:bg-[#08152F]/5 hover:text-[#08152F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24A]"
                >
                  Maybe later
                </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
