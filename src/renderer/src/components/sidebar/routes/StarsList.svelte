<script>
    // @ts-nocheck
    import { onMount } from "svelte"
    import { todos, removeItem, addStar, nowDate } from "../../../store/stores";
    import { IconStar, IconX } from "@tabler/icons-svelte";
    import EmptyPage from "./placeholders/EmptyPage.svelte"
    // Variables
    let day;
    // Functions
    onMount(()=> {
        day = nowDate()
    })
    $: console.log($todos);
</script>

<div class="starslist">
    <div class="starslist-text-container">
        <p class="starslist-text">Önemli</p>
        <p class="starslist-day">{day}</p>
    </div>
    <div class="starslist-all-items">
        {#if $todos.length == 0}
            <EmptyPage />
        {:else}
            <ul class="starslist-unordered">
                {#each $todos as item (item.id)}
                    {#if item.isStar}
                        <li class="static-starslist-items" >
                            <p class="static-starslist-item-text">{item.text}</p>
                            <button on:click={addStar(item.id)} class="static-btn-starslist">
                                <IconStar stroke=1 color='orange' fill={item.isStar ? "orange" : "transparent"} size=18/>
                            </button>
                            <button on:click={removeItem(item.id)} class="static-btn-starslist">
                                <IconX stroke=1 color='red'/>
                            </button>
                        </li>
                    {/if}
                {/each}
            </ul>    
        {/if}
    </div>    
</div>

<style>
    .starslist {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 77vw;
        row-gap: 20px;
        border-top-left-radius: 15px;
        background-color: rgba(255, 166, 0, 0.2);
    }

    .starslist-text-container{
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        width: 85%;
    }

    .starslist-text{
        font-weight: bold;
        font-size: 1.5em;
        color: var(--text-color);
    }

    .starslist-day{
        font-size: .8em;
        color: var(--text-color);

    }

    .starslist-all-items{
        width: 85%;
        height: 530px;
        border-radius: 5px;
        overflow: auto;
    }

    .starslist-all-items::-webkit-scrollbar{
        background-color: rgba(255, 166, 0, 0.3);
        width: 5px;
        border-radius: 10px;
    }
    
    .starslist-all-items::-webkit-scrollbar-thumb{
        background-color: rgba(255, 166, 0, 0.5);
        border-radius: 20px;
    }

    .starslist-unordered{
        list-style-type: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 5px;
        margin-right: 5px;
    }

    .static-starslist-items{
        display: flex;
        align-items: center;
        column-gap: 5px;
        width: 100%;
        min-height: 60px;
        background-color: var(--theme-light-sidebar);
        border-bottom: 2px solid rgba(255, 166, 0, 0.6);
        border-radius: 5px;
    }

    .static-starslist-item-text{
        width: 570px;
        word-wrap: nowrap;
        text-overflow: ellipsis;
        font-size: 1.2em;
        margin-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .static-btn-starslist{
        display: flex;
        position: inline-block;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }
</style>