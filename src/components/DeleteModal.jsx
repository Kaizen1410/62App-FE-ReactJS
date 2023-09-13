import { Button, Modal } from 'flowbite-react';
import { BeatLoader } from 'react-spinners';

export default function PopUpModal({ openModal, setOpenModal, action, isLoading }) {

    return (
        <>
            <Modal show={openModal === 'pop-up'} size="md" popup onClose={() => setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <i className="fa-solid fa-circle-exclamation text-5xl text-gray-400 text-center mb-6"></i>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete?
                        </h3>
                        <div className="flex justify-center gap-4">
                            {isLoading
                                ?
                                <Button color="failure" onClick={action} disabled>
                                    <BeatLoader color="white" size={6} className='my-1 mx-2' />
                                </Button>
                                :
                                <Button color="failure" onClick={action}>
                                    Yes, I'm sure
                                </Button>
                            }
                            <Button color="gray" onClick={() => setOpenModal(undefined)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}


