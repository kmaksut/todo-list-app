<script>
    import { todos, modalChoose } from '../../../../store/stores'
    import { IconAlertTriangle, IconX} from '@tabler/icons-svelte'
    // Functions
    function chooseYes() {
        // @ts-ignore
        todos.update(value => {
            const updatedTodoList = [];
                // @ts-ignore
                window.api.saveTodos(updatedTodoList)
                return updatedTodoList;
        });
        modalChoose.set(false)
    }
    function chooseNo() {
        return modalChoose.set(false)
    }
</script>

<div class="modal-container">
    <div class="modal">
        <div class="modal-top">
            <IconAlertTriangle size=50 color="orange"/>
            <p>Uyarı</p>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="modal-close" on:click={()=>modalChoose.set(false)}>
                <IconX cursor="pointer"/>
            </div>
        </div>
        <div class="modal-separator"></div>
        <p class="modal-text">Listenin tamamını silmek istediğinden eminmisin ? <br> Tüm yıldızlı ve bitirilmiş görevler kaldırılacak ...</p>
        <div class="modal-separator"></div>
        <div class="modal-bottom">
            <button on:click={chooseYes} class="static-choose chooseYes">Evet</button>
            <button on:click={chooseNo} class="static-choose chooseNo">Hayır</button>    
        </div>
    </div>
</div>

<style>
    .modal-container{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100vh;
        /* background-color: rgba(0, 0, 0, 0.2); */
    }

    .modal{
        width: 370px;
        min-height: 150px;
        background-color: rgb(106, 93, 106, .7);
        backdrop-filter: blur(6px);
        box-shadow: 2px 2px 10px black;
        border-radius: 10px;
        color: rgba(255, 255, 255, 0.692);
    }

    .modal-top{
        display: flex;
        column-gap: 10px;
        align-items: center;
        padding: 20px 20px 10px;
    }

    .modal-close{
        /* position: absolute; */
        margin-left: 190px;
    }

    .modal-bottom{
        display: flex;
        column-gap: 10px;
        padding: 20px;
    }

    .modal-text{
        height: fit-content;
        padding: 20px;
        line-height: 20px;
    }

    .modal-separator{
        width: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .static-choose{
        border: none;
        width: 70px;
        height: 35px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
    }

    .chooseYes {
        /* background-color: rgba(88, 2, 88, 0.4); */
        background-color: rgb(0, 255, 0, .5);
        color: white;
    }

    .chooseNo{
        background-color: rgba(255, 255, 255, 0.7);
    }

</style>