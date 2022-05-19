<template>
  <div class="course-create-space">
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
            <el-input v-model="form.courseDescription"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input type="textarea" v-model="form.previewFirstField" placeholder="概述1"></el-input>
            <el-input type="textarea" v-model="form.previewSecondField" placeholder="概述2"></el-input>
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
            <el-input placeholder="" v-model="form.input2">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input placeholder="" v-model="form.input2">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销售">
            <el-input placeholder="" v-model="form.input2">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input placeholder="" v-model="form.input2"> </el-input>
          </el-form-item>
        </div>
        <div v-show="activeSetps === 3">
          <el-form-item label="限时秒杀开关">
            <el-switch
              v-model="isSwitch"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <div v-show="isSwitch">
            <el-form-item label="开始时间">
              <el-time-select
                v-model="value1"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
                placeholder="请选择日期时间"
              >
              </el-time-select>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-time-select
                v-model="value2"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
                placeholder="请选择日期时间"
              >
              </el-time-select>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input placeholder="请输入内容" v-model="form.input2">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input placeholder="请输入内容" v-model="form.input2">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="activeSetps === 4">
          <el-form-item label="课程详情">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form-item>
        </div>
        <el-form-item v-if="activeSetps !== setpsList.length - 1">
          <el-button @click="activeSetps++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ImageUpload from './components/ImageUpload.vue'

export default Vue.extend({
  name: 'CourseCreate',
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
      value1: '',
      value2: '',
      form: {
        id: 0,
        courseName: '', // 1
        brief: '',
        courseDescription: '', // 1
        teacherId: 0,
        totalCourseTime: 0,
        sales: 0,
        actualSales: 0,
        price: 0,
        priceTag: '',
        discounts: 0,
        discountsTag: '',
        courseImgUrl: '', //
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
        courseListImg: '', //
        tag: '',
        status: 0,
        sortNum: 0,
        brokerageRate: 0,
        joinDistribution: true,
        lastNoticeTime: '',
        previewFirstField: '', // 1
        previewSecondField: '', // 1
        distributionPosterImage: '',
        distributionCopywriter: '',
        isGray: true,
        sectionDTOS: [
          {
            id: 0,
            courseId: 0,
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
                courseId: 0,
                sectionId: 0,
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
                  id: 0,
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
            ]
          }
        ],
        teacherDTO: {
          id: 0,
          courseId: 0,
          teacherName: '', // 1
          teacherHeadPicUrl: '',
          position: '',
          description: '' // 1
        },
        courseUrl: '',
        topNCourseLesson: [
          {
            id: 0,
            courseId: 0,
            sectionId: 0,
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
              id: 0,
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
        isBuy: true,
        lessonUpdateCount: 0,
        compareTime: '',
        lastLearnLessonName: '',
        courseDescriptionMarkDown: '',
        activityCourse: true,
        activityTime: 0,
        activityCourseDTO: {
          id: 0,
          courseId: 0,
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
  components: {
    ImageUpload
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>
</style>
