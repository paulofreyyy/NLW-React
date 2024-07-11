import { ArrowRight, UserRoundPlus } from "lucide-react";

interface InviteGuestsModalProps {
    openGuestsModal: () => void;
    emailsToInvite: string[];
    openConfrimTripModal: () => void;
}

export function InviteGuestsStep({
    openGuestsModal,
    emailsToInvite,
    openConfrimTripModal,
}: InviteGuestsModalProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button onClick={openGuestsModal} className="flex items-center gap-2 flex-1 text-left">
                <UserRoundPlus className="size-5 text-zinc-400" />
                {
                    emailsToInvite.length > 0 ? (
                        <span className="text-zinc-100 text-lg flex-1">
                            {emailsToInvite.length} pessoa(s) convidada(s)
                        </span>
                    ) : (
                        <span className="text-zinc-400 text-lg flex-1">Quem estará na viagem?</span>
                    )
                }
            </button>

            <div className="w-px h-6 bg-zinc-800" />

            <button onClick={openConfrimTripModal} className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirmar viagem
                <ArrowRight className="size-5" />
            </button>
        </div>
    )
}