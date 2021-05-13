<template>
<div translate="no" class="notranslate">
    <editor api-key="ndtppreouzrsq68kbhvtru6n2cbdj92ilq4aymfd7i9rgxg4" :init="config" v-model="contentLocal"/>
</div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
// import axiosi from 'axios'

export default {
    name: 'EditorComponent',
    components: {
        'editor': Editor
    },
    props: ['content'],
    data: () => ({
        // baseUrl: env.base.VUE_APP_API,
        ccc: '',
        config: {
            height: 200,
            menubar: false,
            language: 'ru',
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            //toolbar: 'bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image',
            toolbar: 'bold italic backcolor | bullist numlist | code image',
            //automatic_uploads: true,
            //image_uploadtab: true,
            //images_upload_url: 'http://hm-api.test/api/uploaded-files',
            //images_upload_base_path: '/statics/web',
            //images_upload_credentials: true,
            // images_upload_handler: function(blobInfo, success, failure, progress) {
            // 
            //     let formData = new FormData();
            //     formData.append('upfile[]', blobInfo.blob(), blobInfo.filename());
            //     //console.log(formData);
            //     axiosi.post('/uploaded-files', formData).then(res => {
            //         success('http://hm-api.test' + res.data[0].path + '/' + res.data[0].filename)
            //       
            //     })
            // }
        }
    }),
    computed: {
        contentLocal: {
            get() {
                return this.content
            },
            set(newValue) {
                this.$emit('content', newValue)
            }
        }
    }

}
</script>
