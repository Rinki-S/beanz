"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { CoffeeLabelPreview } from "./coffee-label-preview";

// 定义表单验证模式
const formSchema = z.object({
  brand: z.string().min(1, { message: "请输入咖啡豆品牌" }),
  flavor: z.string().min(1, { message: "请输入咖啡豆风味特征" }),
  origin: z.string().min(1, { message: "请输入咖啡豆产区" }),
  roastLevel: z.string().min(1, { message: "请选择烘焙程度" }),
  recipient: z.string().min(1, { message: "请输入收件人" }),
  notes: z.string().optional(),
  quantity: z.string().optional(),
});

export function CoffeeForm() {
  // 初始化表单
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "示例咖啡",
      flavor: "巧克力、坚果、焦糖",
      origin: "埃塞俄比亚",
      roastLevel: "medium",
      recipient: "咖啡爱好者",
      notes: "日晒处理",
      quantity: "200g",
    },
  });

  // 监听表单值变化
  const formValues = form.watch();

  // 提交表单
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>品牌</FormLabel>
                  <FormControl>
                    <Input placeholder="例如: 星巴克、雀巢" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="flavor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>风味特征</FormLabel>
                  <FormControl>
                    <Textarea placeholder="例如: 玉兰花 水蜜桃 佛手柑 甜甘蔗" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>产区</FormLabel>
                  <FormControl>
                    <Input placeholder="例如: 埃塞俄比亚、哥伦比亚" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roastLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>烘焙程度</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择烘焙程度" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">浅烘焙</SelectItem>
                      <SelectItem value="medium-light">中浅烘焙</SelectItem>
                      <SelectItem value="medium">中烘焙</SelectItem>
                      <SelectItem value="medium-dark">中深烘焙</SelectItem>
                      <SelectItem value="dark">深烘焙</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>收件人</FormLabel>
                  <FormControl>
                    <Input placeholder="例如: 张三" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>数量</FormLabel>
                  <FormControl>
                    <Input placeholder="例如: 200g" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>处理方式</FormLabel>
                  <FormControl>
                    <Textarea placeholder="例如: 水洗 希尔达" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">生成标签</Button>
          </form>
        </Form>
      </div>
      <div>
        <CoffeeLabelPreview data={formValues} />
      </div>
    </div>
  );
}
