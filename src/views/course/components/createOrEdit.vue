<template>
  <div class="create-edit-course">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-steps :active="activeSetps" simple>
          <el-step
            :title="setp.text"
            v-for="(setp, index) in setpsList"
            :key="index"
            @click.native="activeSetps = index"
            :icon="setp.icon"
          ></el-step>
        </el-steps>
      </div>
      <el-form ref="form" label-width="120px">
        <div v-show="activeSetps === 0">
          <el-form-item label="课程名称">
            <el-input v-model="form.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="form.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              type="textarea"
              class="summary"
              v-model="form.previewFirstField"
              placeholder="概述1"
            ></el-input>
            <el-input
              type="textarea"
              v-model="form.previewSecondField"
              placeholder="概述2"
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="form.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="form.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number
              v-model="form.sortNum"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeSetps === 1">
          <el-form-item label="课程封面">
            <!-- v-model 干了两件事 -->
            <!-- prop：value -> modelValue；
            事件：input -> update:modelValue； -->
            <ImageUpload v-model="form.courseListImg" />
          </el-form-item>
          <el-form-item label="介绍封面">
            <ImageUpload v-model="form.courseImgUrl" />
          </el-form-item>
        </div>
        <div v-show="activeSetps === 2">
          <el-form-item label="售卖价格">
            <el-input placeholder="" v-model="form.discounts">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input placeholder="" v-model="form.price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销售">
            <el-input placeholder="" v-model="form.sales">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input placeholder="" v-model="form.discountsTag"> </el-input>
          </el-form-item>
        </div>
        <div v-show="activeSetps === 3">
          <el-form-item label="限时秒杀开关">
            <el-switch
              v-model="form.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <div v-show="form.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="form.activityCourseDTO.beginTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="form.activityCourseDTO.endTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input
                placeholder="请输入内容"
                v-model="form.activityCourseDTO.amount"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input
                placeholder="请输入内容"
                v-model="form.activityCourseDTO.stock"
              >
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="activeSetps === 4">
          <el-form-item label="课程详情">
            <TextEdit v-model="form.courseDescriptionMarkDown" />
          </el-form-item>
          <el-form-item label="是否上下架">
            <el-switch
              v-model="form.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </div>
        <el-form-item v-if="activeSetps !== setpsList.length - 1">
          <el-button @click="next">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ImageUpload from './ImageUpload.vue'
import { toSaveOrUpdateCourse, toGetCourseById } from '@/utils/course'
import TextEdit from './TextEdit.vue'
import dayjs from 'dayjs'
// console.log('dayjs', dayjs().format('YYYY-MM-DD'))

export default Vue.extend({
  name: 'CourseCreateOrEdit',
  data() {
    return {
      activeSetps: 0,
      setpsList: [
        {
          text: '基本信息',
          icon: 'el-icon-edit'
        },
        {
          text: '课程封面',
          icon: 'el-icon-edit'
        },
        {
          text: '销售信息',
          icon: 'el-icon-edit'
        },
        {
          text: '秒杀活动',
          icon: 'el-icon-edit'
        },
        {
          text: '课程详情',
          icon: 'el-icon-edit'
        }
      ],
      form: {
        // id: 0,
        courseName: '',
        brief: '',
        courseDescription: '',
        // teacherId: 0,
        totalCourseTime: 0,
        sales: 0,
        actualSales: 0,
        price: 0,
        priceTag: '',
        discounts: 0,
        discountsTag: '',
        courseImgUrl: '',
        shareTitle: '',
        shareDescription: '',
        shareImageTitle: '',
        isNew: true,
        isNewDes: '',
        lastOperatorId: 0,
        createTime: '',
        updateTime: '',
        autoOnlineTime: '',
        isDel: true,
        totalDuration: 0,
        seoDescription: '',
        seoKeywords: '',
        seoTitle: '',
        h5Url: '',
        courseListImg: '',
        tag: '',
        status: 0,
        sortNum: 0,
        brokerageRate: 0,
        joinDistribution: true,
        lastNoticeTime: '',
        previewFirstField: '',
        previewSecondField: '',
        distributionPosterImage: '',
        distributionCopywriter: '',
        isGray: true,
        sectionDTOS: [
          {
            // id: 0,
            // courseId: 0,
            sectionName: '',
            description: '',
            createTime: '',
            updateTime: '',
            isVisible: true,
            isDe: true,
            orderNum: 0,
            lastOperatorId: 0,
            status: 0,
            lessonDTOS: [
              {
                id: 0,
                // courseId: 0,
                // sectionId: 0,
                theme: '',
                duration: '',
                durationNum: 0,
                isFree: true,
                startImgUrl: '',
                textContent: '',
                markdownTextContent: '',
                transcode: '',
                resourceUrl: '',
                lastOperatorId: 0,
                createTime: '',
                updateTime: '',
                isDel: true,
                fileId: '',
                orderNum: 0,
                aliFileUrl: '',
                aliFileDk: '',
                aliFileEdk: '',
                aliFileVid: '',
                status: 0,
                isTimingPublish: true,
                publishTime: '',
                mediaDTO: {
                  // id: 0,
                  // courseId: 0,
                  // sectionId: 0,
                  // lessonId: 0,
                  channel: 0,
                  mediaType: 0,
                  coverImageUrl: '',
                  duration: '',
                  fileId: '',
                  fileUrl: '',
                  fileEdk: '',
                  fileSize: 0,
                  fileName: '',
                  fileDk: '',
                  createTime: '',
                  updateTime: '',
                  status: 0,
                  isDel: true,
                  lastOperatorId: 0,
                  durationNum: 0
                }
              }
            ]
          }
        ],
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseUrl: '',
        topNCourseLesson: [
          {
            // id: 0,
            // courseId: 0,
            // sectionId: 0,
            theme: '',
            duration: '',
            durationNum: 0,
            isFree: true,
            startImgUrl: '',
            textContent: '',
            markdownTextContent: '',
            transcode: '',
            resourceUrl: '',
            lastOperatorId: 0,
            createTime: '',
            updateTime: '',
            isDel: true,
            fileId: '',
            orderNum: 0,
            aliFileUrl: '',
            aliFileDk: '',
            aliFileEdk: '',
            aliFileVid: '',
            status: 0,
            isTimingPublish: true,
            publishTime: '',
            mediaDTO: {
              // id: 0,
              courseId: 0,
              sectionId: 0,
              lessonId: 0,
              channel: 0,
              mediaType: 0,
              coverImageUrl: '',
              duration: '',
              fileId: '',
              fileUrl: '',
              fileEdk: '',
              fileSize: 0,
              fileName: '',
              fileDk: '',
              createTime: '',
              updateTime: '',
              status: 0,
              isDel: true,
              lastOperatorId: 0,
              durationNum: 0
            }
          }
        ],
        // isBuy: true,
        // lessonUpdateCount: 0,
        // compareTime: '',
        // lastLearnLessonName: '',
        courseDescriptionMarkDown: '',
        activityCourse: false,
        // activityTime: 0,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        }
      },
      imageUrl: '',
      imageUrl2: '',
      isSwitch: false
    }
  },
  props: ['courseId', 'isEdit'],
  components: {
    ImageUpload,
    TextEdit
  },
  created() {
    console.log('route', this.$route)
    if (this.isEdit) {
      this.loadCourseInfo()
    }
  },
  methods: {
    async loadCourseInfo() {
      const { error, content } = await toGetCourseById(this.$route.params.id)
      try {
        const timeTemp1 = content.activityCourseDTO.beginTime
        const timeTemp2 = content.activityCourseDTO.endTime
        content.activityCourseDTO.beginTime =
          dayjs(timeTemp1).format('YYYY-MM-DD')
        content.activityCourseDTO.endTime =
          dayjs(timeTemp2).format('YYYY-MM-DD')
      } catch (e) {
        console.log('error loadCourseInfo', e)
      }
      if (!error) {
        this.form = content
      }
    },
    next() {
      console.log(this.form)
      this.activeSetps++
    },
    async save() {
      // 表单校验
      // 步骤条交互逻辑
      const { error, message } = await toSaveOrUpdateCourse(this.form)
      if (!error) {
        this.$message.success(message)
        this.$router.back()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.summary {
  margin-block: 10px;
}
</style>
