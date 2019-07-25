<template>
    <div>
        lol
    </div>
</template>

<style lang="scss" scoped>
    .container {
        max-width: 1200px;
        width: 100%;
    }
    .gallery-top {
        .q-card {
            height: 325px;
            border-right: 2px;
        }
        .my-card {
            justify-content: space-between;
            .q-card__actions {
                justify-content: flex-end;
            }
        }
        .card-btn {
            .q-btn {
                padding: 0 18px;
            }
        }
    }
    .gallery-bottom {
        .q-card {
            border-radius: 0;
        }
    }
    .btn-dropdown {
        .q-btn {
            width: 100%;
        }
    }
    .gallery-animation {
        transition: all .5s ease-in-out;
        max-height: 500px;
        opacity: 1;
    }
    .collapsed {
        max-height: 0px;
        overflow: hidden;
        padding: 0px;
        opacity: 0;
    }
    .slider {
        border-radius: 4px;
        .slider-item {
            position: relative;
            .slider-btn {
                position: absolute;
                bottom: 16px;
                right: 16px;
            }
        }
    }

</style>

<script>
export default {
    name: 'Home',
    data() {
        return {
            slide: 1,
            array: [1,2,31,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            show: false
        }
    },
    computed: {
        getFirstLine() {
            const arr = this.array.filter((item , index)=>{
                return index < 6;
            })
            return arr;
        },
        getArray() {
            const arr = this.array.filter((item , index)=>{
                return index > 5;
            })
            return arr;
        }
    },
    methods: {

    }
}
</script>
