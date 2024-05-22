<script lang="ts">
    //@ts-nocheck
    import { onMount } from 'svelte';
    import { v4 as uuidv4} from 'uuid'
    import { IconX, IconStar, IconCheck } from "@tabler/icons-svelte";
    import { todos, removeItem, addStar, doneTodo, modalChoose, nowDate } from '../../../store/stores'
    import Modal from './modal/Modal.svelte';
    import EmptyPage from './placeholders/EmptyPage.svelte'
    // Variables
    let updateAvailableMessage = '';
    let updateDownloadedMessage = '';
    let inputValue:string = "";
    let day:string;
    // functions
    onMount(()=>{
        day = nowDate()
        window.api.updateCheck((info) => {
            updateAvailableMessage = 'Yeni Güncelleme Mevcut'
        });

        window.api.updateDownloaded((info) => {
            updateDownloadedMessage = 'Yeni Güncelleme İndirildi'
        });
    })
    function handleKeyPress(e) {
        if (inputValue == '' || !/[a-zA-Z0-9]/.test(inputValue)) false
        else{
            if (e.key == 'Enter') {
                todos.update(value => [...value, {id: uuidv4(), text: inputValue, isStar: false, isDone: false}])
                inputValue = '';
            }
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="todolist-container">
    <div class="todolist-text-container">
        <p class="todo-text">Yapılacaklar</p>
        <p class="todo-day">{day}</p>
    </div>
    <div on:click={()=>modalChoose.set(!$modalChoose)} class="remove-todos">
        <p>Listeyi sil</p>
    </div>
    <div class="todolist-all-items">
        {#if $todos.length == 0}
            <EmptyPage />
        {:else}
            <ul class="todolist-unordered">
                {#each $todos as item (item.id)}
                    <li on:dblclick={doneTodo(item.id)} class="static-list-items">
                        <div style="background-color: {item.isDone ? "rgba(128, 128, 128, 0.3)" : ""};" on:click={doneTodo(item.id)} class="static-list-items-check">
                            {#if item.isDone}
                                <IconCheck stroke=2 color='var(--text-color)' size=16/>
                            {/if}
                        </div>
                        <!-- style="text-decoration: {item.isDone ? "line-through": "none"} ;" -->
                        <p class="static-list-items-text">{item.text}</p>
                        <button on:click={addStar(item.id)} class="add-star-btn">
                            <IconStar stroke=1 color='orange' fill={item.isStar ? "orange" : "transparent"} size=18/>
                        </button>
                        <button on:click={removeItem(item.id)} class="remove-todo-btn">
                            <IconX stroke=1 color='red'/>
                        </button>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
    <div class="todo-add">
        <input class="todo-input" on:keydown={handleKeyPress} bind:value={inputValue} placeholder="Görev Ekle" type="text">
    </div>
</div>

{#if $modalChoose}
    <Modal />
{/if}

<style>
    .todolist-container{
        border-top-left-radius: 15px;
        width: 77vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: rgba(88, 2, 88, 0.2);     
        /* animation: startingAnimationTodolist 3s ease-in; */
    }

    .todolist-text-container{
        width: 85%;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: left;
        row-gap: 10px;
    }

    .todo-text{
        font-weight: bold;
        font-size: 1.5em;
        color: var(--text-color);
    }

    .todo-day{
        font-size: .8em;
        color: var(--text-color);
    }

    .remove-todos{
        position: absolute;
        right: 70px; top: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        height: fit-content;
        cursor: pointer;
    }

    .remove-todos > p {
        font-size: .8em;
        color: var(--text-color);
        text-decoration: underline;
    }

    .todolist-all-items{
        width: 85%;
        height: 490px;
        overflow-x: none;
        overflow-y: auto;
        margin-top: 10px;
    }

    .todolist-all-items::-webkit-scrollbar{
        background-color: rgba(88, 2, 88, 0.2);
        width: 5px;
        border-radius: 10px;
    }
    
    .todolist-all-items::-webkit-scrollbar-thumb{
        background-color: rgba(88, 2, 88, 0.2);
        border-radius: 20px;
    }

    .todolist-unordered{
        margin-right: 5px;
    }

    .static-list-items{
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 10px;
        border-bottom: 2px solid rgba(88, 2, 88, 0.6);
        border-radius: 5px;
        width: 100%;
        min-height: 55px;
        margin-bottom: 5px;
        background-color: var(--theme-light-sidebar);
        color: black;
        font-size: .8em;
    }

    .static-list-items:hover{
        background-color: var(--hover-color);
        cursor: pointer;
    }

    .static-list-items-text{
        width: 520px;
        word-wrap: nowrap;
        text-overflow: ellipsis;
        font-size: 1.4em;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .static-list-items-check{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(128, 128, 128, 1);
        border-radius: 50%;
        margin-right: 5px;
    }

    .add-star-btn{
        display: flex;
        position: inline-block;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    .remove-todo-btn{
        display: flex;
        position: inline-block;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    .todo-add{
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 10px;
    }

    .todo-input{
        width: 80%;
        height: 40px;
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        padding-left: 40px;
        font-size: .9em;
        background-image: url('../../../assets/plus.svg');
        background-repeat: no-repeat;
        background-position: 5px;
    }

</style>