<template>
  <div class="submitBox" v-loading="loadingStatus">
    <p class="title">组织管理</p>
    <div
      :id="item.id"
      class="organizationItem"
      draggable="true"
      @dragstart="dragstart(item)"
      @dragenter="dragenter(item, $event)"
      @dragend="dragend(item, $event)"
      @dragover="dragover($event)"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="organizationBox">
        <i class="iconfont icon-yidong" style="cursor: pointer"></i>
        <p>组织名称:</p>
        <el-input
          @blur="organizationBlur"
          @focus="organizationFocus(index)"
          v-model="item.name"
          style="width: 200px; margin-left: 10px"
          placeholder="请输入组织名称"
        />
      </div>
      <ul class="MembersTitle">
        <li class="Members">成员</li>
        <li class="info">姓名：</li>
        <li class="info">年龄：</li>
        <li class="active">激活</li>
        <li class="active">管理者</li>
      </ul>
      <ul
        class="MembersTitle"
        v-for="(i, index2) in item.members"
        :key="index2"
      >
        <li class="Members"><i class="iconfont icon-yidong"></i></li>
        <li class="info">
          <el-input
            @blur="membersBlur"
            @focus="membersFocurs(index, index2)"
            v-model="i.name"
            placeholder="请输入成员名称"
          />
        </li>
        <li class="info">
          <el-input
            type="number"
            min="15"
            max="120"
            v-model="i.age"
            placeholder="请输入成员年龄"
          />
        </li>
        <li class="active">
          <input
            :checked="i.status == 'activated'"
            @click="statusChange(index, index2)"
            type="checkbox"
          />
        </li>
        <li class="active">
          <input
            @change="ManagementChange(index, index2)"
            :checked="i.isManagement"
            :disabled="i.status !== 'activated'"
            type="checkbox"
          />
        </li>
      </ul>
      <p style="padding-left: 300px">
        <i
          @click="addMember(index)"
          style="cursor: pointer"
          class="iconfont icon-tianjia"
        ></i>
      </p>
    </div>
    <div>
      <p
        @click="addOrganization"
        style="padding-left: 30px; width: 120px; cursor: pointer"
      >
        <i class="iconfont icon-tianjia"></i>添加组织
      </p>
    </div>
    <div class="operationBox">
      <el-button @click="resetFN">取消</el-button>
      <el-button type="primary" @click="saveFN">保存</el-button>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref, toRefs } from "vue";
export default {
  setup() {
    const tableDate = reactive({
      listAll: [],
      list: [],
      staging: "",
      organizationIndex: null,
      loadingStatus: false,
      memberindex: null,
      memberindex2: null,
      memberstaging: "",
    });

    onMounted(() => {
      tableDate.list = [
        {
          name: "org-1",
          id: "org-1",
          type: "organization",
          representation: "member-1",
          members: [
            {
              name: "member-1",
              id: "member-1",
              age: 29,
              status: "activated",
              isManagement: true,
            },
            {
              name: "member-2",
              id: "member-2",
              age: 29,
              status: "inactivated",
              isManagement: false,
            },
          ],
        },
        {
          name: "org-2",
          id: "org-2",
          type: "organization",
          representation: "member-2",
          members: [
            {
              name: "member-3",
              id: "member-3",
              age: 29,
              status: "activated",
              isManagement: false,
            },
            {
              name: "member-4",
              id: "member-4",
              age: 29,
              status: "inactivated",
              isManagement: false,
            },
          ],
        },
      ];
      tableDate.listAll = tableDate.list;
    });

    const methodsAll = reactive({
      // 激活
      statusChange(index, index2) {
        if (tableDate.list[index].members[index2].status == "activated") {
          tableDate.list[index].members[index2].isManagement = false;
          tableDate.list[index].members[index2].status = "inactivated";
        } else {
          tableDate.list[index].members[index2].status = "activated";
        }
        console.log(list);
      },

      // 管理者
      ManagementChange(index, index2) {
        tableDate.list[index].members[index2].isManagement =
          !tableDate.list[index].members[index2].isManagement;
      },

      // 添加成员
      addMember(index) {
        const newData = {
          name: "",
          id: "member-" + tableDate.list[index].members.length,
          age: null,
          status: "inactivated",
          isManagement: false,
        };
        tableDate.list[index].members.push(newData);
      },

      // 添加组织
      addOrganization() {
        const newData = {
          name: "",
          id: "org-" + tableDate.list.length,
          type: "organization",
          representation: "member-" + tableDate.list.length,
          members: [],
        };
        tableDate.list.push(newData);
      },

      // 保存
      saveFN() {
        tableDate.loadingStatus = true;
        setTimeout(() => {
          ElMessage({
            message: "保存成功",
            type: "success",
          });
          tableDate.loadingStatus = false;
        }, 1000);
      },

      // 取消
      resetFN() {
        tableDate.list = [
          {
            name: "org-1",
            id: "org-1",
            type: "organization",
            representation: "member-1",
            members: [
              {
                name: "member-1",
                id: "member-1",
                age: 29,
                status: "activated",
                isManagement: true,
              },
              {
                name: "member-2",
                id: "member-2",
                age: 29,
                status: "inactivated",
                isManagement: false,
              },
            ],
          },
          {
            name: "org-2",
            id: "org-2",
            type: "organization",
            representation: "member-2",
            members: [
              {
                name: "member-3",
                id: "member-3",
                age: 29,
                status: "activated",
                isManagement: false,
              },
              {
                name: "member-4",
                id: "member-4",
                age: 29,
                status: "inactivated",
                isManagement: false,
              },
            ],
          },
        ];
      },

      // 组织名称
      organizationBlur() {
        if (
          tableDate.list[tableDate.organizationIndex].name.length < 3 ||
          tableDate.list[tableDate.organizationIndex].name.length > 10
        ) {
          ElMessage({
            message: "组织名称长度为3-15",
            type: "warning",
          });
          tableDate.list[tableDate.organizationIndex].name = tableDate.staging;
        }
      },
      organizationFocus(e) {
        tableDate.organizationIndex = e;
        tableDate.staging = tableDate.list[tableDate.organizationIndex].name;
      },

      // 成员
      membersFocurs(index, index2) {
        tableDate.memberindex = index;
        tableDate.memberindex2 = index2;
        tableDate.memberstaging = tableDate.list[index].members[index2].name;
        console.log(tableDate.memberstaging);
      },
      membersBlur() {
        if (
          tableDate.list[tableDate.memberindex].members[tableDate.memberindex2]
            .name.length < 2 ||
          tableDate.list[tableDate.memberindex].members[tableDate.memberindex2]
            .name.length > 10
        ) {
          ElMessage({
            message: "成员名称长度为2-10",
            type: "warning",
          });
          tableDate.list[tableDate.memberindex].members[
            tableDate.memberindex2
          ].name = tableDate.memberstaging;
        }
      },
    });

    const dragstart = (e) => {
      // console.log(e);
      // 拿到拖动的数据
    };
    const dragenter = (item, e) => {
      // item 拖动的数据
      // e 拖动位置信息
      // console.log(e);
    };
    const dragend = (v, e) => {
      console.log(e);
    };
    const dragover = (e) => {
      // console.log("1", e);
      // console.log("4" + e);
    };

    return {
      ...methodsAll,
      ...toRefs(tableDate),
      dragstart,
      dragenter,
      dragend,
      dragover,
    };
  },
};
</script>

<style >
.operationBox {
  border-top: 1px solid #ccc;
  text-align: right;
  margin-top: 10px;
  padding: 5px 10px;
}
.active {
  width: 15%;
}
.info {
  width: 20%;
  margin: 0px 5px;
}
.Members {
  width: 30%;
}
.MembersTitle {
  margin: 10px 0px;
  display: flex;
  text-align: center;
}
.organizationBox {
  display: flex;
  align-items: center;
  height: 30px;
}
.organizationItem {
  width: 100%;
  margin: 5px 0px;
  padding: 10px;
  border: 1px solid #ccc;
}
.submitBox {
  width: 800px;
  padding: 10px;
  border: 1px solid #ccc;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.submitBox {
  padding: 5px 10px;
}
</style>