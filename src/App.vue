<template>
    <div class="box">
        it works
    </div>
</template>

<script>
    module.exports = {}
</script>
<style lang="sass">
    @mixin border-radius($radius)
        -webkit-border-radius: $radius
        border-radius: $radius
    .box
        @include border-radius(10px)

</style>
