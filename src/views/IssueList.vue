<template>
    <div>
        <el-button @click="showIssues()" type="success" round>Obtenir les problèmes</el-button>

        <el-row :gutter="12">
            <el-col :span="12" v-for="( issue, index ) in issues" :key="issue.id">
                <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
                    <el-row :gutter="12">
                        <el-col :span="21">{{ issue.title }}</el-col>
                        <el-col :span="3">
                            <el-button @click="closedIssue(index)" type="success" icon="el-icon-check" circle></el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios';
const client = axios.create({
    baseURL: `${process.env.VUE_APP_GITHUB_ENDPOINT}`,
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${process.env.VUE_APP_GITHUB_TOKEN}`
    },
})
export default {
    name: 'IssueList',
    data() {
        return {
            issues: []
        }
    },
    methods: {
        showIssues() {
            client.get('/issues').then((res) => {
                this.issues = res.data;
            }
            )
        },
        closedIssue(index){
            const target = this.issues[index];
            client.patch(`/issues/${target.number}`,
            {
                state: 'closed'
            }).then(()=>{
                this.issues.splice(index, 1);
            })
        },
    },
    created(){
            this.showIssues();
        }
}
</script>