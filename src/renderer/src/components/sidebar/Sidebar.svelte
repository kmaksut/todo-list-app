<script>
// @ts-nocheck
    import { IconListCheck, IconList, IconStar, IconEyeClosed, IconEye, IconSettings } from "@tabler/icons-svelte";
    import { mainTodoActive, doneTodoActive, starsTodoActive, secretTodoActive, doneTodoList, starsTodoList, todoListMain, secretTodoList, userInfo, renderSecret, optionsActive } from '../../store/stores'
    import profileIcon from '../../assets/profile.png?asset'
    import { onMount } from "svelte"
    import Options from "./routes/Options.svelte"
    // Variables
    /**
     * @type {boolean} 
     */
    let themeSwitcher = false;
    // Reactive 
    $: themeSwitcher ? window.api.toggle() :  window.api.toggle()
</script>

<div class="sidebar">
    <div class="sidebar-container">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="profile-section">
            <div class="profile-section-top">
                <img class="profile-img" src={profileIcon} alt="profile">
                <div class="profile-text">
                    <p class="profile-name">{$userInfo[0].name} {$userInfo[0].surname}</p>
                    <p class="description">{$userInfo[0].description}</p>
                </div>
            </div>
        </div>
        <hr class="separator">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="sidebar-menu-items">
            <div on:click={todoListMain} class="static-sidebar-item {$mainTodoActive ? "active-tab" : ""}">
                <IconList  class="IconList" stroke=1 color="purple" size=20/> 
                Yapılacaklar
            </div>
            <div on:click={doneTodoList} class="static-sidebar-item {$doneTodoActive ? "active-tab" : ""}">
                <IconListCheck stroke=1 color="green" size=20/>
                Tamamlanmış
            </div>
            <div on:click={starsTodoList} class="static-sidebar-item {$starsTodoActive ? "active-tab" : ""}">
                <IconStar stroke=1 color="orange" fill={$starsTodoActive?"orange":"transparent"} size=20/>
                Önemli
            </div>
            <div on:click={secretTodoList} class="static-sidebar-item {$secretTodoActive ? "active-tab" : ""}">
                {#if $renderSecret}
                    <IconEye stroke=2 color="gray" size=20/>
                {:else}
                    <IconEyeClosed stroke=1.5 color="gray" size=18/>
                {/if}
                Gizli
            </div>
        </div>
        <div class="sidebar-bottom">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={()=>optionsActive.set(!$optionsActive)} class="static-sidebar-item">
                <IconSettings size=20 />
                <p class="settings-text">Ayarlar</p>
            </div>
            {#if $optionsActive}
                <Options />
            {/if}
            <div class="switch">
                <p class="switch-text">Light</p>
                <input bind:checked={themeSwitcher} type="checkbox" id="switch">
                <label for="switch"></label>
                <p>Dark</p>
            </div>
        </div>
    </div>
</div>

<style>
    .sidebar{
        width: 231px;
        height: 100vh;
    }

    .profile-section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        margin: 10px;
        width: 90%;
        height: 80px;
    }

    .profile-section-top{
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 10px;
    }

    .profile-img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .profile-text{
        width: 128px;
        display: flex;
        flex-direction: column;
        row-gap: 3px;
    }

    .profile-name {
        font-size: .9em;
        font-weight: bold;
    }

    .description{
        font-size: .8em;
    }

    .sidebar-menu-items{
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 7px;
    }

    .static-sidebar-item{
        display: flex;
        flex-direction: row;
        column-gap: 10px;
        align-items: center;
        width: 85%;
        height: 45px;
        font-size: .9em;
        padding-left: 10px;
        border-radius: 5px;
    }

    .static-sidebar-item:hover{
        background-color: var(--hover-color);
    }

    .active-tab{
        background-color: var(--hover-color);
    }

    .active-tab:after{
        content: '';
        position: absolute;
        left: 12px;
        width: 4px;
        height: 18px;
        border-radius: 30px;
        background-color: rgba(0, 128, 0, 0.9);
        animation: activeEffect .1.5s ease-in;
    }

    .separator {
        width: 83%;
        margin: auto;
        margin-bottom: 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
    }

    .sidebar-bottom{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        row-gap: 10px;
        margin-top: 240px;
        width: 100%;
    }

    .switch{
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 10px;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        padding-top: 10px;
        width: 195px;
        height: 50px;
    }

    input[type=checkbox]{
        height: 0;
        width: 0;
        visibility: hidden;
    }

    label{
        cursor: pointer;
        width: 50px;
        height: 30px;
        background: var(--text-color);
        display: block;
        border-radius: 15px;
        position: relative;        
    }

    label::after{
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        width: 20px;
        height: 20px;
        background: url('../../assets/moon-stars.svg');
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 90px;
        transition: 0.8s, background .5s;
    }

    input:checked + label::after{
        left: calc(100% - 5px);
        transform: translateX(-100%);
    } 

    @keyframes activeEffect {
        0%{
            height: 0px;
        }
        50%{
            height: 10px;
        }
        100%{
            height: 18px;
        }
    }
</style>