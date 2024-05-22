<script>
    import { IconListCheck, IconList, IconStar, IconPencil } from "@tabler/icons-svelte";
    import { mainTodoActive, doneTodoActive, starsTodoActive, doneTodoList, starsTodoList, todoListMain, userInfo } from '../../store/stores'
    // import { v4 as uuidv4} from 'uuid'
    // Variables
    let userInformations = false
    let activeTabName = ""
    let activeTabSurname = ""
    let activeTabDescription = ""
    // Functions
    function userInfoToggle() {
        userInformations = !userInformations
    }
    function userInfoChange() {
        if (activeTabName == '' || activeTabSurname == '' || activeTabDescription == '') false
        else{
            userInfo.update(value => value.filter(curr => curr.name = activeTabName))
            userInfo.update(value => value.filter(curr => curr.surname = activeTabSurname))
            userInfo.update(value => value.filter(curr => curr.description = activeTabDescription))
            activeTabName = activeTabSurname = activeTabDescription = ""
        }
        console.log($userInfo);
    }
</script>

<div class="sidebar">
    <div class="sidebar-container">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={userInfoToggle} class="profile-section {userInformations ? "profile-section-active" : ""}">
            <div class="profile-section-top">
                <img class="profile-img" src={$userInfo[0].profileIcon} alt="profile">
                <div class="profile-text">
                    <p class="profile-name">{$userInfo[0].name} {$userInfo[0].surname}</p>
                    <p class="description">{$userInfo[0].description}</p>
                </div>
            </div>
        </div>
        {#if userInformations}
            <div class="add-profile">
                <div class="active-profile-tab">
                    <div class="active-profile-tab-ui">
                        <img class="active-tab-icon" src={$userInfo[0].profileIcon} alt="profileIcon">
                        <span class="active-tab-cp">
                            <IconPencil size=20 color="white"/>
                        </span>
                        <div class="active-tab-text-container">
                            <p class="active-tab-text">{$userInfo[0].name} {$userInfo[0].surname}</p>
                            <p class="active-tab-description">{$userInfo[0].description}</p>    
                        </div>
                    </div>
                    <div class="active-tab-ci-container">
                        <div class="inputlist">
                            <p>İsim</p>
                            <input bind:value={activeTabName} type="text">
                            <p>Soyisim</p>
                            <input bind:value={activeTabSurname} type="text">
                            <p>Açıklama</p>
                            <input bind:value={activeTabDescription} type="text">    
                        </div>
                        <dir>
                            <button on:click={userInfoChange}>Değiştir</button>
                        </dir>
                    </div>
                </div>
            </div>
        {/if}
        <hr class="separator">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="sidebar-menu-items">
            <div on:click={todoListMain} class="static-sidebar-item {$mainTodoActive ? "active-tab" : ""}">
                <IconList stroke=1 color="purple" size=18/> 
                Yapılacaklar
            </div>
            <div on:click={doneTodoList} class="static-sidebar-item {$doneTodoActive ? "active-tab" : ""}">
                <IconListCheck stroke=1 color="green" size=18/>
                Tamamlanmış
            </div>
            <div on:click={starsTodoList} class="static-sidebar-item {$starsTodoActive ? "active-tab" : ""}">
                <IconStar stroke=1 color="orange" fill={$starsTodoActive?"orange":"transparent"} size=18/>
                Önemli
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

    .add-profile{
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 400px;
        left: 240px;
        top: 10px;
        background-color: var(--theme-light-sidebar);
        border-radius: 15px;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .profile-section:hover{
        background-color: #ebebeb92;
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
        row-gap: 5px;
    }

    .static-sidebar-item{
        display: flex;
        flex-direction: row;
        column-gap: 10px;
        align-items: center;
        width: 85%;
        height: 45px;
        font-size: .8em;
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
    }

    .active-tab-icon{
        width: 80px;
        border-radius: 50%;        
    }

    .active-tab-cp{
        width: 25px;
        height: 25px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 80px;
        right: 200px;
        border-radius: 50%;
        background-color: rgba(0, 128, 0, 0.9);
        cursor: pointer;
    }

    .active-profile-tab-ui{
        display: flex;
        flex-direction: row;
        height: 90px;
        border-radius: 10px;
        padding: 10px ;
        align-items: center;
        column-gap: 15px;
        margin: 10px;
        background-color: var(--hover-color);
    }

    .active-tab-text-container{
        display: flex;
        flex-direction: column;
        row-gap: 5px;
    }

    .active-tab-text{
        font-size: 1.1em;
        font-weight: bold;
    }

    .active-tab-description{
        font-size: .9em;
    }

    .active-tab-ci-container input{
        width: 88%;
        height: 30px;
        margin-top: 5px;
        margin-left: 10px;
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.266);
        border-radius: 5px;
        padding-left: 10px;
    }

    .active-tab-ci-container button{
        border: none;
        width: 92%;
        height: 45px;
        border-radius: 10px;
        background-color: rgba(0, 128, 0, 0.6);
        color: white;
        font-family: arial;
        margin-top: 20px;
        margin-left: 10px;
        cursor: pointer;
    }

    .active-tab-ci-container p{
        font-size: .9em;
        margin-left: 12px;
        margin-top: 10px;
    }

    .separator {
        width: 83%;
        margin: auto;
        margin-bottom: 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
    }
  
</style>