import EditCategoryModal from './EditCategoryModal'
import EditTaskModal from './EditTaskModal'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

const ModalContainer = () => {
    return (
        <div className="">
            <RegisterModal />
            <LoginModal />
            <EditTaskModal />
            <EditCategoryModal />
        </div>
    )
}

export default ModalContainer
