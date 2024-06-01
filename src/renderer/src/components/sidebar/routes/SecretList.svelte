<script>
    // @ts-nocheck
    import { userInfo, renderSecret } from "../../../store/stores";
    import { dndzone } from "svelte-dnd-action";
    import { writable } from 'svelte/store';

    let passwordValue;

    function handleKeyPress(e) {
        if (e.key == 'Enter') {
            if ($userInfo[0].passwd == passwordValue) {
                passwordValue = ''
                e.target.style.border = '2px solid green'
                setTimeout(()=>renderSecret.set(true),2000)
            }else if (passwordValue == '') false
            else{
                e.target.style.border = '2px solid red'
                setTimeout(()=>e.target.style.border = '1px solid rgba(0, 0, 0, 0.4)', 1500)
                passwordValue = ''
            }
        }
    }

</script>

<div class="secret-list">
    {#if $renderSecret}
        <div>Merhaba Dünya</div>
        <button on:click={()=>renderSecret.set(false)}>Kasayı Kapat Abi</button>
    {:else}
        <div class="secret-list-passwd">
            <input bind:value={passwordValue} on:keydown={handleKeyPress} placeholder="Şifre">
        </div>
    {/if}
</div>


<style>
    .secret-list{
        width: 77vw;
        background-color: rgba(128, 128, 128, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        border-top-left-radius: 15px;
    }
    .secret-list-passwd input{
        width: 200px;
        height: 30px;
        border-radius: 5px;
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.4);
        padding-left: 10px;
    }
    .secret-list-passwd input:focus{
        border: 1px solid rgba(0, 0, 0, 0.6);
    }
</style>