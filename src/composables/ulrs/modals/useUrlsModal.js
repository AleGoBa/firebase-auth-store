import {useModal} from "vue-final-modal";
import UrlsModal from "../../../components/Modals/UrlsModal.vue";
import {useUrlsStore} from "../../../store/useUrlsStore.js";

export const useUrlsModal = () => {
    const {getUrls} = useUrlsStore()

    const {open, close, patchOptions} = useModal({
        component: UrlsModal,
        keepAlive: false,
    })

    const show = (props) => {
        patchOptions({
            attrs: {
                ...props,
                onHide: () => {
                    close()
                },
                onDone: () => {
                    getUrls()
                    close()
                }
            },
        })
        open()
    }

    return {
        show,
        close
    }
}