package com.vzh.iherych.Controller;

import com.vzh.iherych.Model.Comment;
import com.vzh.iherych.Service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping()
    public ResponseEntity<Comment> save(Comment comment) {
        return commentService.save(comment) != null ? ResponseEntity.ok(comment) : ResponseEntity.badRequest().build();
    }

    @GetMapping("/{page}/{size}")
    public List<Comment> getAllComments(@PathVariable Integer page, @PathVariable Integer size){
        return commentService.getAllComments(page, size);
    }
}
