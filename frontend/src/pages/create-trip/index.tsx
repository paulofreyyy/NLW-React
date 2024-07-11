import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";

export function CreateTripPage() {
    const navigate = useNavigate();
    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

    const [emailsToInvite, setEmailToInvite] = useState([
        'paulohenriquep2000@gmail.com'
    ])

    function openGuestsInput() {
        setIsGuestsInputOpen(true)
    }

    function closeGuestsInput() {
        setIsGuestsInputOpen(false)
    }

    function openGuestsModal() {
        setIsGuestsModalOpen(true)
    }

    function closeGuestsModal() {
        setIsGuestsModalOpen(false)
    }

    function openConfrimTripModal() {
        setIsConfirmTripModalOpen(true)
    }

    function closeConfrimTripModal() {
        setIsConfirmTripModalOpen(false)
    }

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget)
        const email = data.get("email")?.toString()

        if (!email) {
            return
        }

        if (emailsToInvite.includes(email)) {
            return
        }

        setEmailToInvite([
            ...emailsToInvite,
            email
        ])

        event.currentTarget.reset()
    }

    function removeEmailsFromInvite(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

        setEmailToInvite(newEmailList);
    }

    function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        navigate('/trips/123')
    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center gap-3">
                    <img src="/logo.svg" alt="" />
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeja sua próxima viagem!</p>
                </div>

                <div className="space-y-4">
                    <DestinationAndDateStep
                        isGuestsInputOpen={isGuestsInputOpen}
                        closeGuestsInput={closeGuestsInput}
                        openGuestsInput={openGuestsInput}
                    />

                    {
                        isGuestsInputOpen && (
                            <InviteGuestsStep
                                openGuestsModal={openGuestsModal}
                                emailsToInvite={emailsToInvite}
                                openConfrimTripModal={openConfrimTripModal}
                            />
                        )
                    }
                </div>

                <p className="text-sm text-zinc-500">
                    Ao planejar sua viagem pela Plann.er você automaticamente concorda <br />
                    com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
                </p>
            </div>

            {//*** MODAL CONVIDADOS***
                isGuestsModalOpen && (
                    <InviteGuestsModal
                        emailsToInvite={emailsToInvite}
                        addNewEmailToInvite={addNewEmailToInvite}
                        closeGuestsModal={closeGuestsModal}
                        removeEmailsFromInvite={removeEmailsFromInvite}
                    />
                )
            }

            {//*** MODAL CONFIRMAÇÃO ***
                isConfirmTripModalOpen && (
                    <ConfirmTripModal
                        closeConfirmTripModal={closeConfrimTripModal}
                        createTrip={createTrip}
                    />
                )
            }
        </div>
    )
}